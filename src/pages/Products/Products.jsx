import React, { useState } from "react";
import ProductList from "../../components/ProductList";

import AddNewProduct from "../../components/AddNewProduct";
import EditProduct from "../../components/EditProduct";

import "./style.css";

const Products = () => {
  const [pageMode, setPageMode] = useState("listing");
  const [productId, setProductId] = useState("");

  const handleStartEditing = (id) => {
    setProductId(id);
    setPageMode("editing");
  };

  return (
    <div className="products-container">
      {pageMode === "editing" && (
        <EditProduct
          endEditingMode={() => setPageMode("listing")}
          productId={productId}
        />
      )}
      {pageMode === "adding" && (
        <AddNewProduct endAddingMode={() => setPageMode("listing")} />
      )}
      {pageMode === "listing" && (
        <ProductList
          startAddingMode={() => setPageMode("adding")}
          startEditingMode={handleStartEditing}
        />
      )}
    </div>
  );
};

export default Products;
