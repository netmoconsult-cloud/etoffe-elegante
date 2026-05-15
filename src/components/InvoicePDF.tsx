import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 11, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: 1, paddingBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  tableHeader: { backgroundColor: '#f3f4f6', padding: 8, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', padding: 8 },
  total: { marginTop: 20, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#000' },
  footer: { marginTop: 30, textAlign: 'center', fontSize: 9, color: '#999' }
});

export default function InvoicePDF({ order, customer, items, totals }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>ÉTOFFE ÉLÉGANTE</Text>
          <Text style={styles.subtitle}>Facture n° {order.id}</Text>
          <Text>Date : {new Date(order.date).toLocaleDateString('fr-FR')}</Text>
        </View>

        {/* Client */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Client :</Text>
          <Text>{customer.name}</Text>
          <Text>{customer.address}</Text>
          <Text>{customer.phone}</Text>
        </View>

        {/* Tableau des produits */}
        <View style={{ marginBottom: 20 }}>
          <View style={[styles.tableHeader, { flexDirection: 'row' }]}>
            <Text style={{ flex: 3 }}>Produit</Text>
            <Text style={{ flex: 1, textAlign: 'center' }}>Qté</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Prix unit.</Text>
            <Text style={{ flex: 1, textAlign: 'right' }}>Total</Text>
          </View>
          {items.map((item, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={{ flex: 3 }}>{item.name}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>{item.price.toLocaleString()} FCFA</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>{(item.price * item.quantity).toLocaleString()} FCFA</Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.total}>
          <View style={styles.row}><Text>Sous-total</Text><Text>{totals.subtotal.toLocaleString()} FCFA</Text></View>
          <View style={styles.row}><Text>Livraison (Dakar)</Text><Text>{totals.livraison.toLocaleString()} FCFA</Text></View>
          <View style={styles.row}><Text>TVA (18%)</Text><Text>{totals.tax.toLocaleString()} FCFA</Text></View>
          <View style={[styles.row, { fontWeight: 'bold', marginTop: 5 }]}><Text>Total TTC</Text><Text>{totals.total.toLocaleString()} FCFA</Text></View>
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text>Merci pour votre confiance.</Text>
          <Text>Étoffe Élégante - L'élégance dans chaque étoffe</Text>
        </View>
      </Page>
    </Document>
  );
}