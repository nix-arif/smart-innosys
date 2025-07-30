// import { PrismaClient } from "@/generated/prisma";
// import fs from "fs";
// import XLSX from "xlsx";

// const prisma = new PrismaClient();

// async function main() {
//   let data: any;
//   let wb: any;
//   fs.readdirSync(process.cwd() + "/prisma/seed").forEach((file) => {
//     wb = XLSX.readFile(process.cwd() + "/prisma/seed/" + file);
//   });

//   const ws = wb.Sheets[wb.SheetNames[0]];
//   const aoa: {
//     productCode: string;
//     description: string;
//     unitPrice: string;
//     oum: string;
//   }[] = XLSX.utils.sheet_to_json(ws);
//   data = aoa.map((item, index) => {
//     if (!item.productCode) {
//       console.log(item);
//       console.log(index);
//     }
//     return {
//       productCode: item.productCode.trim(),
//       description: item.description.trim(),
//       unitPrice: parseFloat(item.unitPrice) * 10,
//       oum: item.oum.trim(),
//     };
//   });

//   // console.log(first);

//   const jsonData = JSON.stringify(aoa, null, 2);

//   // Synchronously write JSON data to file
//   try {
//     fs.writeFileSync("data.json", jsonData);
//     console.log("Data written to file successfully");
//   } catch (err) {
//     console.error("Error writing to file:", err);
//   }

//   await prisma.product.deleteMany({});

//   await prisma.product
//     .createMany({
//       data: data,
//     })
//     .then((data) => console.log("done"))
//     .catch((err) => console.log(err));
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from "@/generated/prisma";
import fs from "fs";
import XLSX from "xlsx";

const prisma = new PrismaClient();

async function main() {
  const seedPath = process.cwd() + "/prisma/seed";

  const files = fs
    .readdirSync(seedPath)
    .filter((f) => f.endsWith(".xlsx") || f.endsWith(".xls"));

  for (const file of files) {
    const supplierName = file.replace(/\.[^/.]+$/, ""); // remove extension

    console.log(
      `⏳ Seeding products for supplier: ${supplierName} from ${file}`
    );

    const wb = XLSX.readFile(`${seedPath}/${file}`);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const aoa = XLSX.utils.sheet_to_json<{
      brandName: string;
      productCode: string;
      description: string;
      unitPrice: string;
      oum: string;
      mdaRegistrationNo: string;
      mdaPageNo: number;
      mdaEffectiveDate: Date;
      mdaExpiryDate: Date;
    }>(ws);

    // Deduplicate by productCode (within file)
    const uniqueItems = Array.from(
      new Map(aoa.map((item) => [item.productCode?.trim(), item])).values()
    );

    // Clean and validate
    const cleanedItems = uniqueItems
      .map((item) => ({
        brandName: item.brandName.trim(),
        productCode: item.productCode?.trim(),
        description: item.description?.trim(),
        unitPrice: parseFloat(item.unitPrice),
        oum: item.oum?.trim(),
        mdaRegistrationNo: item.mdaRegistrationNo?.trim(),
        mdaPageNo: item.mdaPageNo,
        mdaEffectiveDate: item.mdaEffectiveDate
          ? excelDateToJSDate(item.mdaEffectiveDate)
          : null,
        mdaExpiryDate: item.mdaExpiryDate
          ? excelDateToJSDate(item.mdaExpiryDate)
          : null,
      }))
      .filter(
        (item) =>
          item.productCode &&
          item.description &&
          item.oum &&
          !isNaN(item.unitPrice)
      );

    // Get existing products from DB to skip
    const existing = await prisma.product.findMany({
      where: {
        productCode: {
          in: cleanedItems.map((i) => i.productCode),
        },
      },
      select: { productCode: true },
    });
    const existingCodes = new Set(existing.map((e) => e.productCode));

    const supplier = await prisma.supplier.upsert({
      where: { supplierName },
      update: {},
      create: {
        supplierName,
      },
    });

    let insertedCount = 0;
    let skippedCount = 0;

    for (const item of cleanedItems) {
      if (existingCodes.has(item.productCode)) {
        console.warn(`⚠️ Skipping duplicate productCode: ${item.productCode}`);
        skippedCount++;
        continue;
      }

      await prisma.product.create({
        data: {
          brandName: item.brandName,
          productCode: item.productCode,
          description: item.description,
          unitPrice: item.unitPrice,
          oum: item.oum,
          mdaRegistrationNo: item.mdaRegistrationNo,
          mdaPageNo: item.mdaPageNo,
          mdaEffectiveDate: item.mdaEffectiveDate,
          mdaExpiryDate: item.mdaExpiryDate,
          supplier: {
            connect: { id: supplier.id },
          },
        },
      });

      insertedCount++;
    }

    console.log(
      `✅ Done seeding for ${supplierName} — inserted: ${insertedCount}, skipped: ${skippedCount}`
    );
  }

  console.log("🎉 All suppliers seeded.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

function excelDateToJSDate(excelDate: any) {
  // Excel's base date is January 0, 1900 (serial number 0)
  // 25569 is the number of days between 1900-01-01 and 1970-01-01 (Unix epoch)
  // 86400000 is the number of milliseconds in a day
  return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
}

const excelDate = 44385; // Example Excel date serial number (e.g., July 1, 2021)
const jsDate = excelDateToJSDate(excelDate);
console.log(jsDate);
