import React from "react";
import {
  Document,
  Page,
  Image,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    color: "#000",
  },
});

type Props = {
  imageUrl: string;
};

const MyPdfDocument = ({ imageUrl }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={imageUrl} style={styles.image} />
      <Text style={styles.text}>This is an image from a URL</Text>
    </Page>
  </Document>
);

export default MyPdfDocument;
