import React from 'react'
import * as XLSX from 'xlsx'
function Journee() {
    const handleJournee = (e) =>{
        const file = e.target.files[0]
        console.log(file)
        if(file){
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onload = (e)=>{
                const data = e.target.result
                const workbook =XLSX.read(data,{type:'binary'})
                const sheetName = workbook.SheetNames[0]
                const sheet = workbook.Sheets[sheetName]
                const parseData = XLSX.utils.sheet_to_json(sheet,{header:1})
                console.log(parseData)
                const vols = parseData.map(row=>{
                    const value = row[0]
                    const value1 = row[12]
                    return (typeof (value === "string" && (/"CHA"|"REG"|"SUP"/).test(value1))) ? value : ""
                }).filter(item=>item != "").slice(6)
                console.log(vols)
                const total = vols.length
                const tar = vols.filter(i=>i==="TAR").length
                console.log(tar)
                const lbt = vols.filter(i=>i==="LBT").length
                console.log(lbt)
                const tux = vols.filter(i=>i==="TUX").length
                console.log(tux)
                const autres = total-(tar+lbt+tux)
                console.log(autres)
            }
        }
    }
  return (
    <div>
        <input type="file" accept='.xlsx, .xls' onChange={handleJournee} />
    </div>
  )
}

export default Journee