-- DropForeignKey
ALTER TABLE "AffirmaInvoice" DROP CONSTRAINT "AffirmaInvoice_customerId_fkey";

-- DropForeignKey
ALTER TABLE "AffirmaInvoice" DROP CONSTRAINT "AffirmaInvoice_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "AffirmaInvoice" ADD CONSTRAINT "AffirmaInvoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffirmaInvoice" ADD CONSTRAINT "AffirmaInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;
