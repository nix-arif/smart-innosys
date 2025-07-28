// components/ProductPdf.tsx

import { Quotation } from "@/redux/features/quotation/quotationSlice";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: hyphenation for long words
Font.registerHyphenationCallback((word) => {
  return word.match(/.{1,8}/g) ?? [word];
});

const IMAGE_WIDTH = 140;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    fontSize: 9,
    paddingTop: 80, // leave space for header
    paddingRight: 40, // ~1.4 cm (~0.55 in)
    paddingBottom: 60, // leave space for footer
    paddingLeft: 40,
  },
  header: {
    position: "absolute",
    top: 30,
    left: 40,
    right: 40,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
  },
  table: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  colDetails: {
    flex: 1,
    paddingRight: 12,
  },
  colImage: {
    width: IMAGE_WIDTH,
    alignItems: "center",
    // Image will stick to top of cell
  },
  image: {
    width: "100%",
    height: "auto",
  },
  textItem: {
    lineHeight: 1.4,
    marginBottom: 3,
  },
  label: {
    fontWeight: "bold",
  },
});

type ProductCatalogPdfProps = {
  data: Quotation;
};

export const ProductCatalogPdf = ({ data }: ProductCatalogPdfProps) => {
  const affirma = data?.quotationItems?.affirma ?? [];
  const title = data?.quotationHeaders?.affirma?.title ?? "Product Catalog";

  return (
    <Document>
      <Page style={styles.page} size="A4" wrap>
        {/* Fixed header */}
        <Text fixed style={styles.header}>
          {title}
        </Text>

        {/* Product Table */}
        <View style={styles.table}>
          {affirma.map((item, idx) => (
            <View key={item.productCode ?? idx} style={styles.row} wrap={false}>
              {/* Left column: product info */}
              <View style={styles.colDetails}>
                {item.no && (
                  <Text style={styles.textItem}>
                    <Text style={styles.label}>No: </Text>
                    {item.no}
                  </Text>
                )}
                <Text style={styles.textItem}>
                  <Text style={styles.label}>Product Code: </Text>
                  {item.productCode}
                </Text>
                <Text style={styles.textItem}>
                  <Text style={styles.label}>Description: </Text>
                  {item.description}
                </Text>
              </View>

              {/* Right column: product image */}
              {item.productImage ? (
                <View style={styles.colImage}>
                  <Image src={item.productImage} style={styles.image} />
                </View>
              ) : (
                <View style={styles.colImage}>
                  <Text>No Image</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Fixed footer with page numbers */}
        <Text
          fixed
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};
