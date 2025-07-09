"use client";

import { Quotation } from "@/redux/features/quotation/quotationAffirmaSlice";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontSize: 8,
  },
  letterHead: {
    fontSize: 8,
    margin: 10,
    padding: 10,
    position: "relative",
  },
  letterHeadLeft: {
    position: "absolute",
    left: 10,
  },
  letterHeadRight: {
    textAlign: "right",
  },
  logo: {
    width: 80,
  },
  section: {
    paddingRight: 40,
    paddingLeft: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    // display: "table",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    fontSize: 10,
    padding: 5,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
  },
  totalRow: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid black",
    marginTop: 10,
    paddingBottom: 5,
  },
  row: { flexDirection: "row", paddingVertical: 2 },
  col: { flex: 1, paddingRight: 5 },
  signature: { marginTop: 20 },
  bold: { fontWeight: "bold" },
  rightAlign: { textAlign: "right" },
  colNo: { flex: 5 }, // 5%
  colItem: { flex: 30 }, // 30%
  colCat: { flex: 15 }, // 15%
  colQty: { flex: 10 }, // 10%
  colPrice: { flex: 20 }, // 20%
  colTotal: { flex: 20 }, // 20%
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
});

// Create Document Component
export const MyDocument: React.FC<{
  data: Quotation;
}> = ({ data }) => {
  const { quotationHeader, quotationItem } = data;
  const {
    organizationName,
    addressLine1,
    addressLine2,
    addressLine3,
    postcode,
    city,
    province,
    country,
  } = quotationHeader.selectedOrganization;
  const { title, fullname } = quotationHeader.customer;
  const products = quotationItem.products;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.letterHead}>
          <View style={styles.letterHeadLeft}>
            <Image src="/LogoNoWhite.png" style={styles.logo} />
          </View>
          <View style={styles.letterHeadRight}>
            <Text>SMART INNOSYS SDN BHD (1477421-V)</Text>
            <Text>41-1, Jalan Neutron U16/Q</Text>
            <Text>Seksyen U16, Denai Alam</Text>
            <Text>40160 Shah Alam, Selangor, Malaysia</Text>
            <Text>smartinnosys@gmail.com</Text>
            <Text>019-612 5883</Text>
          </View>
        </View>
        {/* Delivery Order Detail */}
        <View style={styles.section}>
          <View>
            <View>
              <Text>{organizationName.toUpperCase()}</Text>
              <Text>{addressLine1.toUpperCase()}</Text>
              <Text>{addressLine2.toUpperCase()}</Text>
              {addressLine3 && <Text>{addressLine3.toUpperCase()}</Text>}
              <Text>{`${postcode}, ${city.toUpperCase()}`}</Text>
              <Text>{`${province.toUpperCase()}, ${country.toUpperCase()}`}</Text>
              <Text> </Text>
            </View>
            <View>
              <Text>
                <Text style={{ fontWeight: "bold" }}>Attn: </Text>
                {`${title.toUpperCase()} ${fullname.toUpperCase()}`}
              </Text>
            </View>
          </View>

          <View>
            <Text>Reference No.: {quotationHeader.quotationRef}</Text>
            <Text>Date: {quotationHeader.date}</Text>
          </View>
        </View>

        {/* Customer detail */}

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col, styles.bold, styles.colNo]}>NO.</Text>
            <Text style={[styles.col, styles.bold, styles.colItem]}>ITEM</Text>
            <Text style={[styles.col, styles.bold, styles.colCat]}>CAT NO</Text>
            <Text style={[styles.col, styles.bold, styles.colQty]}>QTY</Text>
            <Text style={[styles.col, styles.bold, styles.colQty]}>OUM</Text>
            <Text style={[styles.col, styles.bold, styles.colPrice]}>
              PRICE/UNIT (RM)
            </Text>
            <Text style={[styles.col, styles.bold, styles.colTotal]}>
              TOTAL (RM)
            </Text>
          </View>

          {/* Table Rows */}
          {products.map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={[styles.col, styles.colNo]}>{idx + 1}</Text>
              <Text style={[styles.col, styles.colItem]}>
                {item.description}
              </Text>
              <Text style={[styles.col, styles.colCat]}>
                {item.productCode}
              </Text>
              <Text style={[styles.col, styles.colQty]}>{item.qty}</Text>
              <Text style={[styles.col, styles.colQty]}>{item.oum}</Text>
              <Text style={[styles.col, styles.colPrice]}>
                {item.unitPrice.toFixed(2)}
              </Text>
              <Text style={[styles.col, styles.colTotal]}>
                {item.totalPrice.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Totals */}
          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={[styles.col, styles.rightAlign, styles.bold]}>
              TOTAL (RM):
            </Text>
            <Text style={styles.col}>20,000.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.col, styles.rightAlign, styles.bold]}>
              SST:
            </Text>
            <Text style={styles.col}>0.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.col, styles.rightAlign, styles.bold]}>
              GRAND TOTAL (RM):
            </Text>
            <Text style={styles.col}>20,000.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.col, styles.rightAlign, styles.bold]}>
              GRAND TOTAL 2 SETS (RM):
            </Text>
            <Text style={styles.col}>40,000.00</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.signature}>
          <Text>
            Thank you for supporting us. If you require any further
            clarification, feel free to contact us.
          </Text>
          <Text>Authorised Signature,</Text>
          <Text style={{ marginTop: 20 }}>…………………………………</Text>
          <Text>Mohd Azni</Text>
        </View>
      </Page>
    </Document>
  );
};
