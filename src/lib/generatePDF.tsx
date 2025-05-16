import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { QuotationData } from "@/lib/definitions";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontSize: 12,
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
    marginLeft: 20,
  },
  table: {
    // display: "table",
    width: "100%",
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
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
});

// Create Document Component
export const MyDocument: React.FC<{
  data: QuotationData;
}> = (detailDO) => {
  const { data } = detailDO;
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
        <View>
          <Text></Text>
        </View>

        {/* Customer detail */}

        <View style={styles.table}>
          <View style={styles.tableRow}></View>
        </View>
      </Page>
    </Document>
  );
};
