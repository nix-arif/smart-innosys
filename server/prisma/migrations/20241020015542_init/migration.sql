-- DropForeignKey
ALTER TABLE "SmartInnosysInvoice" DROP CONSTRAINT "SmartInnosysInvoice_customerId_fkey";

-- DropForeignKey
ALTER TABLE "SmartInnosysInvoice" DROP CONSTRAINT "SmartInnosysInvoice_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "SmartInnosysInvoice" ADD CONSTRAINT "SmartInnosysInvoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartInnosysInvoice" ADD CONSTRAINT "SmartInnosysInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE CASCADE ON UPDATE CASCADE;
