import React, { forwardRef } from "react";

const CertificateTemplate = forwardRef(({ studentName, courseTitle }, ref) => (
  <div
    ref={ref}
    style={{
      width: "800px",
      height: "600px",
      background: "#f9fafb",
      color: "#22223b",
      fontFamily: "serif",
      border: "2px solid #3b4252",
      padding: "40px",
      boxSizing: "border-box",
      textAlign: "center",
      position: "relative",
    }}
  >
    <div style={{ fontWeight: "bold", fontSize: "2rem", color: "#22223b", marginBottom: "16px" }}>
      <span style={{ color: "#1e293b", fontWeight: "900", fontSize: "2.2rem" }}>TRACKACADEMY</span>
    </div>
    <div style={{ fontWeight: "bold", fontSize: "2.5rem", marginBottom: "24px", letterSpacing: "2px" }}>
      CERTIFICATE OF COMPLETION
    </div>
    <div style={{ fontSize: "1.1rem", marginBottom: "16px", letterSpacing: "1px" }}>
      THIS CERTIFICATE IS PROUDLY PRESENTED TO
    </div>
    <div style={{ fontWeight: "bold", fontSize: "2.2rem", marginBottom: "16px", letterSpacing: "2px" }}>
      {studentName}
    </div>
    <div style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
      FOR SUCCESSFULLY COMPLETING THE COURSE
    </div>
    <div style={{ fontWeight: "bold", fontSize: "2rem", color: "#1e293b", marginBottom: "40px", letterSpacing: "2px" }}>
      {courseTitle}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "60px", padding: "0 40px" }}>
      <div>
        <div style={{ borderTop: "2px solid #22223b", width: "120px", margin: "0 auto" }}></div>
        <div style={{ fontSize: "1rem", marginTop: "4px" }}>DATE</div>
      </div>
      <div>
        <div style={{ borderTop: "2px solid #22223b", width: "120px", margin: "0 auto" }}></div>
        <div style={{ fontSize: "1rem", marginTop: "4px" }}>SIGNATURE</div>
      </div>
    </div>
  </div>
));

export default CertificateTemplate;
