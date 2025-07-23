import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Quotation } from "@/redux/features/quotation/quotationSlice";
import { capitalizeFirstLetter } from "../capitalFirstLetter";
import { formatAccounting } from "../formatAccountingNo";

type QuotationAffirmaPDFProps = {
  data: Quotation;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontSize: 8,
    paddingBottom: 40, // Ensure footer space
  },
  letterHead: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#144450",
  },
  logo: { width: 80 },
  docTypeContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  docType: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSection: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    fontSize: 9,
  },
  headerSectionRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  introSection: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 9,
  },
  tableContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableHeader: {
    backgroundColor: "#f3f3f3",
    fontWeight: "bold",
  },
  tableCol: {
    paddingHorizontal: 4,
  },
  tableColRight: {
    paddingHorizontal: 4,
    textAlign: "right",
  },
  colNo: { flex: 5 },
  colCat: { flex: 15 },
  colItem: { flex: 40 },
  colQty: { flex: 5 },
  colOum: { flex: 5 },
  colPrice: { flex: 15 },
  colTotal: { flex: 15 },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
    paddingHorizontal: 20,
  },
  closingNoteContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  closingNoteRow: {
    flexDirection: "row",
    // paddingVertical: 4,
    // paddingHorizontal: 2,
  },
  affirmaStamp: {
    position: "absolute",
    right: 0, // align to right of container
    bottom: 0, // stick to bottom
    width: 60,
  },
  closingRow: {
    marginBottom: 4,
  },
  closingCol1: {
    width: "50px",
  },
  closingCol2: {
    flex: "10px",
  },
  closingCol3: {
    flex: "200px",
  },
});

const QuotationAffirmaPDF = ({ data }: QuotationAffirmaPDFProps) => {
  const { quotationRef, customer, date, selectedOrganization, title } =
    data.quotationHeaders.affirma;
  const products = data.quotationItems.affirma;

  const grandTotal = products.reduce((sum, p) => sum + p.totalPrice, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Letterhead */}
        <View style={styles.letterHead} fixed>
          <View>
            <Image src="/logo/affirmaLogo.png" style={styles.logo} />
          </View>
          <View>
            <Text>AFFIRMA SDN BHD 202301041436(1535355-M)</Text>
            <Text>59-3, Jalan Nova K U5/K</Text>
            <Text>Seksyen U5, Subang Bestari</Text>
            <Text>40160 Shah Alam, Selangor, Malaysia</Text>
            <Text>affirma.sdn.bhd@gmail.com</Text>
            <Text>010-272 7356</Text>
          </View>
          <View style={styles.docTypeContainer}>
            <Text style={styles.docType}>Quotation</Text>
          </View>
        </View>

        {/* Address & Ref */}
        <View style={styles.headerSection} fixed>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              Attn: {capitalizeFirstLetter(customer.title)}{" "}
              {capitalizeFirstLetter(customer.fullname)}
            </Text>
            <Text>
              {capitalizeFirstLetter(selectedOrganization.department[0])}
            </Text>
            <Text>
              {capitalizeFirstLetter(selectedOrganization.organizationName)}
            </Text>
            <Text>
              {capitalizeFirstLetter(selectedOrganization.addressLine1)}
            </Text>
            <Text>
              {capitalizeFirstLetter(selectedOrganization.addressLine2)}
            </Text>
            <Text>
              {capitalizeFirstLetter(selectedOrganization.addressLine3 || "")}
            </Text>
            <Text>
              {selectedOrganization.postcode},{" "}
              {capitalizeFirstLetter(selectedOrganization.city)}
            </Text>
            <Text>{capitalizeFirstLetter(selectedOrganization.province)}</Text>
          </View>
          <View style={styles.headerSectionRight}>
            <Text>Quote Ref No.: {quotationRef.toUpperCase()}</Text>
            <Text>Date: {date}</Text>
          </View>
        </View>

        <View style={styles.introSection} fixed>
          <Text style={{ marginTop: 10 }}>
            We are pleased to quote as follows:
          </Text>
        </View>

        {/* Table */}
        <View style={styles.tableContainer}>
          <View style={[styles.tableRow, { backgroundColor: "#f3f3f3" }]} fixed>
            <Text
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 9,
                fontWeight: "bold",
              }}
            >
              {title.toUpperCase()}
            </Text>
          </View>

          <View style={[styles.tableRow, styles.tableHeader]} fixed>
            <Text
              style={[styles.tableCol, styles.colNo, { textAlign: "center" }]}
            >
              No
            </Text>
            <Text
              style={[styles.tableCol, styles.colCat, { textAlign: "center" }]}
            >
              Product Code
            </Text>
            <Text style={[styles.tableCol, styles.colItem]}>Description</Text>
            <Text
              style={[styles.tableCol, styles.colQty, { textAlign: "right" }]}
            >
              Qty
            </Text>
            <Text
              style={[styles.tableCol, styles.colOum, { textAlign: "left" }]}
            >
              Oum
            </Text>
            <Text style={[styles.tableColRight, styles.colPrice]}>
              Unit Price (MYR)
            </Text>
            <Text style={[styles.tableColRight, styles.colTotal]}>
              Total (MYR)
            </Text>
          </View>

          {products.map((item, idx) => (
            <View
              wrap={false}
              key={idx}
              style={[
                styles.tableRow,
                idx % 2 === 1 ? { backgroundColor: "#fafafa" } : {},
              ]}
            >
              <Text
                style={[styles.tableCol, styles.colNo, { textAlign: "center" }]}
              >
                {item.no}
              </Text>
              <Text
                style={[
                  styles.tableCol,
                  styles.colCat,
                  { textAlign: "center" },
                ]}
              >
                {item.productCode}
              </Text>
              <Text style={[styles.tableCol, styles.colItem]}>
                {item.description}
              </Text>
              <Text
                style={[styles.tableCol, styles.colQty, { textAlign: "right" }]}
              >
                {item.qty}
              </Text>
              <Text style={[styles.tableCol, styles.colOum]}>{item.oum}</Text>
              <Text style={[styles.tableColRight, styles.colPrice]}>
                {formatAccounting(item.unitPrice)}
              </Text>
              <Text style={[styles.tableColRight, styles.colTotal]}>
                {formatAccounting(item.totalPrice)}
              </Text>
            </View>
          ))}

          <View
            style={[
              styles.tableRow,
              { backgroundColor: "#f3f3f3", fontWeight: "bold" },
            ]}
          >
            <Text style={[styles.tableCol, styles.colNo]}></Text>
            <Text style={[styles.tableCol, styles.colCat]}></Text>
            <Text style={[styles.tableCol, styles.colItem]}>Total</Text>
            <Text style={[styles.tableCol, styles.colQty]}></Text>
            <Text style={[styles.tableCol, styles.colOum]}></Text>
            <Text style={[styles.tableColRight, styles.colPrice]}></Text>
            <Text style={[styles.tableColRight, styles.colTotal]}>
              {formatAccounting(grandTotal)}
            </Text>
          </View>
        </View>

        {/* Closing Note (end of content) */}
        <View style={styles.closingNoteContainer}>
          <View style={styles.closingNoteRow}>
            <Text style={styles.closingCol1}>Price</Text>
            <Text style={styles.closingCol2}>:</Text>
            <Text style={styles.closingCol3}>
              Nett‑Price (SST Not Included)
            </Text>
          </View>
          <View style={styles.closingNoteRow}>
            <Text style={styles.closingCol1}>Delivery</Text>
            <Text style={styles.closingCol2}>:</Text>
            <Text style={styles.closingCol3}>
              Ex‑stock subject to prior sales; otherwise 8‑12 weeks upon
              official order.
            </Text>
          </View>
          <View style={styles.closingNoteRow}>
            <Text style={styles.closingCol1}>Validity</Text>
            <Text style={styles.closingCol2}>:</Text>
            <Text style={styles.closingCol3}>90 days</Text>
          </View>
        </View>
        <View style={styles.closingNoteContainer}>
          <Text>
            Thank you for supporting us. Any inquiry can be directly contact us
            as stated address.
          </Text>
          <Text>
            Should you require any further clarifications, please do not
            hesitate to contact the undersigned.
          </Text>
          <Text style={{ marginTop: 20 }}>Authorised Signature,</Text>
          <Image src={"/sign/affirmaSign.png"} style={styles.logo} />
          <Image src={"/stamp/affirmaStamp.png"} style={styles.affirmaStamp} />
          <Text>Mohd Azni Bin Azali</Text>
          <Text>(Managing Director)</Text>
        </View>

        {/* Page Footer */}
        <View style={styles.footer} fixed>
          <Text>
            Note: This document is system generated and does not require a
            signature.
          </Text>
          <Text>All prices are subject to change without prior notice.</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};

export default QuotationAffirmaPDF;
