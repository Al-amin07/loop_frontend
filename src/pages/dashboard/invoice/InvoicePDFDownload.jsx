/* eslint-disable react/prop-types */

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 20, marginBottom: 20 },
  text: { fontSize: 12, marginBottom: 5 },
});

// Create PDF Component
const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Invoice Details</Text>
        <Text style={styles.text}>Invoice ID: {invoice?.id}</Text>
        <Text style={styles.text}>Status: {invoice?.status}</Text>
        <Text style={styles.text}>
          Amount: {invoice?.amount?.value} {invoice?.amount?.currency_code}
        </Text>
        <Text style={styles.text}>
          Recipient Email:{" "}
          {invoice?.primary_recipients[0]?.billing_info?.email_address || "N/A"}
        </Text>
        <Text style={styles.text}>
          Invoice Date: {invoice?.detail?.invoice_date || "N/A"}
        </Text>
        <Text style={styles.text}>
          Terms: {invoice?.detail?.terms_and_conditions}
        </Text>
        <Text style={styles.text}>Note: {invoice?.detail.note}</Text>
      </View>
    </Page>
  </Document>
);

// Create a download button
const InvoicePDFDownload = ({ invoice }) => (
  <PDFDownloadLink
    document={<InvoicePDF invoice={invoice} />}
    fileName="invoice.pdf"
  >
    {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
  </PDFDownloadLink>
);

export default InvoicePDFDownload;
