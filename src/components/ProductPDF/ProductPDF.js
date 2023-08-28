import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { findList, currency } from "../../config/utils";
import { burguers } from "../../config/const";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  ticket: {
    width: "200px",
    margin: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    textAlign: "center",
    justifyContent: 'flex-start',
    boxShadow: "2px 2px 5px #aaa",
  },
  category: {
    fontSize: "12px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  product: {
    fontSize: "10px",
    marginBottom: "2px",
    fontWeight: 'bold'
  },
  quantity: {
    fontSize: "10px",
  },
  note: {
    fontSize: "12px",
    fontStyle: "italic",
    marginBottom: "2px",
  },
  price: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: "14px",
    fontWeight: "bold",
    padding: '10px',
  },
  numberOrder: {
    fontSize: "10px",
    fontWeight: "bold",
    padding: '10px'
  },
});

const ProductPDF = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {props.data?.map((item, index) => (
            <View key={index} style={styles.ticket}>
              <Text style={styles.numberOrder}># {index + 1}</Text>
              <Text style={styles.product}>
                {findList(burguers, item.product)}
              </Text>
              <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
              <Text style={styles.note}>Notas: {item.note}</Text>
              <Text style={styles.price}>Precio: $ {currency(item.price, 2)}</Text>
            </View>
          ))}
          <Text style={styles.totalPrice}>Total: $ {currency(props.total, 2) || 0}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ProductPDF;
