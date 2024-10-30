-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organizationId" INTEGER NOT NULL,
    "organizationName" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "addressLine3" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "poscode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organizationId")
);

-- CreateTable
CREATE TABLE "SmartInnosysInvoice" (
    "smartInnosysInvoiceId" INTEGER NOT NULL,
    "smartInnosysInvoiceNo" TEXT NOT NULL,
    "smartInnosysDeliveryOrderNo" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "procedureDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "mrnNo" TEXT,
    "caseType" TEXT NOT NULL,
    "salesPerson" TEXT NOT NULL,
    "poNo" TEXT,
    "poDate" TIMESTAMP(3),
    "invoiceAfterPODate" TIMESTAMP(3),
    "paymentStatus" BOOLEAN,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmartInnosysInvoice_pkey" PRIMARY KEY ("smartInnosysInvoiceId")
);

-- CreateTable
CREATE TABLE "AffirmaInvoice" (
    "affirmaInvoiceId" INTEGER NOT NULL,
    "affirmaInvoiceNo" TEXT NOT NULL,
    "affirmaDeliveryOrderNo" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "procedureDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "qty" INTEGER NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "mrnNo" TEXT,
    "caseType" TEXT NOT NULL,
    "salesPerson" TEXT NOT NULL,
    "poNo" TEXT,
    "poDate" TIMESTAMP(3),
    "invoiceAfterPODate" TIMESTAMP(3),
    "paymentStatus" BOOLEAN,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffirmaInvoice_pkey" PRIMARY KEY ("affirmaInvoiceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SmartInnosysInvoice" ADD CONSTRAINT "SmartInnosysInvoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartInnosysInvoice" ADD CONSTRAINT "SmartInnosysInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffirmaInvoice" ADD CONSTRAINT "AffirmaInvoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffirmaInvoice" ADD CONSTRAINT "AffirmaInvoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("organizationId") ON DELETE RESTRICT ON UPDATE CASCADE;
