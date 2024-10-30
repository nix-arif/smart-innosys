-- CreateTable
CREATE TABLE "SmartInnosysLedger" (
    "smartInnosysLedgerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "receiveFrom" TEXT,
    "paidTo" TEXT,
    "docNo" TEXT,
    "docDate" TIMESTAMP(3),
    "remark" TEXT,
    "ledgerId" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SmartInnosysLedger_pkey" PRIMARY KEY ("smartInnosysLedgerId")
);
