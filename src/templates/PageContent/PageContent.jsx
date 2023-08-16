import React from "react";
import "./style.css";

const withPageContainer = (WrappedComponent) => {
  return (props) => (
    <div className="page-container-layout">
      <div className="page-content">
        <WrappedComponent {...props} />
      </div>
    </div>
  );
};

export default withPageContainer;
