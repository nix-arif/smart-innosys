import {
  AgentKey,
  ProductQuotation,
} from "@/redux/features/quotation/quotationSlice";
import Decimal from "decimal.js";

export const generateAllQuotePrice = (
  agent: AgentKey,
  quotationItems: {
    affirma: ProductQuotation[];
    innosys: ProductQuotation[];
    biomech: ProductQuotation[];
  },
  markup: number
) => {
  switch (agent) {
    case "affirma":
      return {
        ...quotationItems,
        affirma: quotationItems.affirma.map((item) =>
          generateOriginalPrice(item, markup)
        ),
        innosys: quotationItems.innosys.map((item) =>
          generateDummyOnePrice(item, markup)
        ),
        biomech: quotationItems.biomech.map((item) =>
          generateDummyTwoPrice(item, markup)
        ),
      };
    case "innosys":
      return {
        ...quotationItems,
        affirma: quotationItems.affirma.map((item) =>
          generateDummyOnePrice(item, markup)
        ),
        innosys: quotationItems.innosys.map((item) =>
          generateOriginalPrice(item, markup)
        ),
        biomech: quotationItems.biomech.map((item) =>
          generateDummyTwoPrice(item, markup)
        ),
      };
    case "biomech":
      return {
        ...quotationItems,
        affirma: quotationItems.affirma.map((item) =>
          generateDummyOnePrice(item, markup)
        ),
        innosys: quotationItems.innosys.map((item) =>
          generateDummyTwoPrice(item, markup)
        ),
        biomech: quotationItems.biomech.map((item) =>
          generateOriginalPrice(item, markup)
        ),
      };
  }
};

const generateOriginalPrice = (
  itemDetail: ProductQuotation,
  markup: number
): ProductQuotation => {
  return {
    ...itemDetail,
    unitPrice: new Decimal(itemDetail.unitPrice)
      .mul(new Decimal(1).add(new Decimal(markup).div(100)))
      .toNumber(),
    totalPrice: new Decimal(itemDetail.unitPrice)
      .mul(
        new Decimal(itemDetail.qty).mul(
          new Decimal(1).add(new Decimal(markup).div(new Decimal(100)))
        )
      )
      .toNumber(),
  };
};

const generateDummyOnePrice = (
  itemDetail: ProductQuotation,
  markup: number
): ProductQuotation => {
  return {
    ...itemDetail,
    unitPrice: new Decimal(itemDetail.unitPrice)
      .mul(new Decimal(1.2).add(new Decimal(markup).div(100)))
      .toNumber(),
    totalPrice: new Decimal(itemDetail.unitPrice)
      .mul(
        new Decimal(itemDetail.qty).mul(
          new Decimal(1.2).add(new Decimal(markup).div(new Decimal(100)))
        )
      )
      .toNumber(),
  };
};

const generateDummyTwoPrice = (
  itemDetail: ProductQuotation,
  markup: number
): ProductQuotation => {
  return {
    ...itemDetail,
    unitPrice: new Decimal(itemDetail.unitPrice)
      .mul(new Decimal(1.4).add(new Decimal(markup).div(100)))
      .toNumber(),
    totalPrice: new Decimal(itemDetail.unitPrice)
      .mul(
        new Decimal(itemDetail.qty).mul(
          new Decimal(1.4).add(new Decimal(markup).div(new Decimal(100)))
        )
      )
      .toNumber(),
  };
};
