import React from "react";
import { WarningTwoTone } from "@ant-design/icons";

const StripeCancel = () => {
  return (
    <div
      className="d-flex justify-content-center fw-bold"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <div>
        <WarningTwoTone style={{ fontSize: "50px" }} />
        </div>
      </div>
    </div>
  );
};

export default StripeCancel;