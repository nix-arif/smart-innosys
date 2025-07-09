"use client";

import {
  Product,
  Quotation,
} from "@/redux/features/quotation/quotationAffirmaSlice";
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
    width: "90%",
    marginHorizontal: "auto",
    paddingLeft: 30,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderStyle: "solid",
    borderWidth: 1,
    // borderColor: "#d3d3d3",
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
  colNo: { flex: 5, textAlign: "center" }, // 5%
  colItem: { flex: 50, workBreak: "break-word" }, // 30%
  colCat: { flex: 15, textAlign: "center" }, // 15%
  colQty: { flex: 5, textAlign: "center" }, // 10%
  colPrice: { flex: 10, textAlign: "center" }, // 20%
  colTotal: { flex: 10, textAlign: "center" }, // 20%
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

  // Header and Footer components
  const Header = () => (
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
  );

  const CustomerDetail = () => (
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
            <Text style={{ fontWeight: "bold" }}>ATTN: </Text>
            {`${title.toUpperCase()} ${fullname.toUpperCase()}`}
          </Text>
        </View>
      </View>

      <View>
        <Text>REF NO.: {quotationHeader.quotationRef.toUpperCase()}</Text>
        <Text>DATE: {quotationHeader.date}</Text>
      </View>
    </View>
  );

  const Footer = ({ pageNumber }: { pageNumber: number }) => (
    <View style={styles.footer}>
      <Text>Page {pageNumber}</Text>
    </View>
  );

  const chunkArray = (array: Product[], size: number) =>
    Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
      array.slice(i * size, i * size + size)
    );

  const itemsPerPage = 20;
  const chunks = chunkArray(data.quotationItem.products, itemsPerPage);

  return (
    <Document>
      {chunks.map((items, index) => (
        <Page size="A4" style={styles.page} key={index}>
          <Header />
          <CustomerDetail />
          <View style={[styles.table, styles.tableHeader]}>
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
          <View style={styles.table}>
            {items.map((item, idx) => (
              <View style={styles.row} key={idx}>
                <Text style={[styles.col, styles.colNo]}>
                  {idx + 1 + index * 20}
                </Text>
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
          </View>
          {index === chunks.length - 1 && (
            <View style={[styles.row, styles.totalRow]}>
              <Text
                style={[
                  styles.col,
                  styles.colItem,
                  { flex: 85, textAlign: "right" },
                ]}
              >
                TOTAL (RM):
              </Text>
              <Text style={[styles.col, styles.colTotal]}>
                {products
                  .reduce((sum, item) => sum + item.totalPrice, 0)
                  .toFixed(2)}
              </Text>
            </View>
          )}
          {index === chunks.length - 1 && (
            <View style={[styles.row, styles.totalRow]}>
              <Text>Price : Nett-Delivered</Text>
              <Text>Delivery : 4 - 12 weeks after receive official PO</Text>
              <Text>Validity : 90 days</Text>
              <Text>Payment : 3 days</Text>
              <Text></Text>
              <Text></Text>
              <Text>
                Should you require any further clarifications, please do not
                hesitate to contact the undersigned
              </Text>
              <Text></Text>
              <Text></Text>
              <Text>Your faithfully,</Text>
              <Text>Smart Innosys Sdn Bhd</Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text>Nik Mohamad Arif Jamaludin</Text>
              <Text>Admin</Text>
              <Text>019 - 612 5883</Text>
            </View>
          )}
          <Footer pageNumber={index + 1} />
        </Page>
      ))}
    </Document>
  );
};
