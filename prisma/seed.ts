import { PrismaClient } from "@/generated/prisma";
import fs from "fs";
import XLSX from "xlsx";

const prisma = new PrismaClient();

async function main() {
  let data: any;
  let wb: any;
  fs.readdirSync(process.cwd() + "/prisma/seed").forEach((file) => {
    wb = XLSX.readFile(process.cwd() + "/prisma/seed/" + file);
  });

  const ws = wb.Sheets[wb.SheetNames[0]];
  const aoa: {
    productCode: string;
    description: string;
    unitPrice: string;
    oum: string;
  }[] = XLSX.utils.sheet_to_json(ws);
  data = aoa.map((item, index) => {
    if (!item.productCode) {
      console.log(item);
      console.log(index);
    }
    return {
      productCode: item.productCode.trim(),
      description: item.description.trim(),
      unitPrice: parseFloat(item.unitPrice) * 10,
      oum: item.oum.trim(),
    };
  });

  // console.log(first);

  const jsonData = JSON.stringify(aoa, null, 2);

  // Synchronously write JSON data to file
  try {
    fs.writeFileSync("data.json", jsonData);
    console.log("Data written to file successfully");
  } catch (err) {
    console.error("Error writing to file:", err);
  }

  await prisma.product.deleteMany({});

  await prisma.product
    .createMany({
      data: data,
    })
    .then((data) => console.log("done"))
    .catch((err) => console.log(err));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
