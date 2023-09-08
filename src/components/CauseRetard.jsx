import React, { useState } from "react";
import * as XLSX from "xlsx";

function CauseRetard() {
  const [excelFile, setExcelFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet);

        // You can process the data here if needed
        console.log(parseData);

        // Set the Excel file data in the state
        setExcelFile(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
      };
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
}

export default CauseRetard;
