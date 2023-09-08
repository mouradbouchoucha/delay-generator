
import React from "react";
import * as XLSX from "xlsx";

function CauseRetard({ fetchRetards }) {
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
        const parseData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const retards = parseData.map(row=>{
            console.log(typeof row[10])
            const value = row[10]
            return value != undefined && typeof value === "string" ? value : ""
        }).filter(item=>item.length !=0 ).slice(1)
        //console.log(parseData)
        //retards.filter(i=>i.length != 0)
        console.log(retards)
        // Notify the parent component (App) with the parsed data
        fetchRetards(retards);
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
