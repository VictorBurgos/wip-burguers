import React, { useState } from "react";
import CustomerList from "../../components/CustomerList";
import AddNewCustomer from "../../components/AddNewCustomer";
import EditCustomer from "../../components/EditCustomer";
import "./style.css";

const Customers = () => {
  const [pageMode, setPageMode] = useState("listing");
  const [customerId, setCustomerId] = useState("");

  const handleStartEditing = (id) => {
    setCustomerId(id);
    setPageMode("editing");
  };

  return (
    <div className="customers-container">
      {pageMode === "editing" && (
        <EditCustomer
          endEditingMode={() => setPageMode("listing")}
          customerId={customerId}
        />
      )}
      {pageMode === "adding" && (
        <AddNewCustomer endAddingMode={() => setPageMode("listing")} />
      )}
      {pageMode === "listing" && (
        <CustomerList
          startAddingMode={() => setPageMode("adding")}
          startEditingMode={handleStartEditing}
        />
      )}
    </div>
  );
};

export default Customers;
