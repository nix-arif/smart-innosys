// components/ProductPdf.tsx

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  image: {
    width: 80,
    height: 80,
    border: "1pt solid #ddd",
  },
  details: {
    flexGrow: 1,
  },
  label: {
    fontWeight: "bold",
  },
  divider: {
    borderBottom: "1pt solid #eee",
    marginVertical: 4,
  },
});

export const ProductPdf = ({ items }: { items: any[] }) => (
  <Document>
    <Page style={styles.page}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.row}>
          {item.productImage ? (
            <Image src={item.productImage} style={styles.image} />
          ) : (
            <View
              style={[
                styles.image,
                { justifyContent: "center", alignItems: "center" },
              ]}
            >
              <Text>No Image</Text>
            </View>
          )}
          <View style={styles.details}>
            <Text>
              <Text style={styles.label}>Code:</Text> {item.productCode}
            </Text>
            <Text>
              <Text style={styles.label}>Description:</Text> {item.description}
            </Text>
            {item.unitPrice && (
              <Text>
                <Text style={styles.label}>Price:</Text> RM{" "}
                {item.unitPrice.toFixed(2)}
              </Text>
            )}
            {item.oum && (
              <Text>
                <Text style={styles.label}>UOM:</Text> {item.oum}
              </Text>
            )}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);
