import React from "react";
import { Button } from "primereact/button";
import {
  exportCSV,
  exportExcel,
  exportPdf,
} from "../../services/export-file-service";

const ReportHeader = ({ dt, formatdata,data, columns, name }) => {
  return (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file"
        tooltip="Exportar a CSV"
        title="CSV"
        rounded
        style={{ borderRadius: "10px", marginRight: "10px" }}
        onClick={() => exportCSV(dt, false)}
      />
      <Button
        type="button"
        icon="pi pi-file-excel"
        title="XLSX"
        tooltip="Exportar a Excel"
        severity="success"
        style={{ borderRadius: "10px", marginRight: "10px" }}
        rounded
        onClick={() => {
          exportExcel(data,name);
        }}
      />
      <Button
        type="button"
        icon="pi pi-file-pdf"
        tooltip="Exportar a PDF"
        severity="warning"
        title="PDF"
        rounded
        style={{ borderRadius: "10px" }}
        onClick={() => {
          exportPdf(formatdata, name , columns);
        }}
      />
    </div>
  );
};

export default ReportHeader;
