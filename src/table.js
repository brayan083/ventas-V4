import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export default function Table() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setButtonDisabled(value === "");
  };

  const obtenerData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/home/semrush", {
        params: {
          domain: inputValue
        }
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarTabla = () => {
    setData(null);
  };

  // Esto es lo unico que se utiliza para descargar en excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "tabla.xlsx");
  };

  return (
    <div>
      <div className="card flex justify-content-center mt-5">
        <InputText value={inputValue} onChange={handleInputChange} />
      </div>
      <Button className="btn btn-primary mb-5 mt-5 mb-3" onClick={obtenerData} disabled={buttonDisabled}>
        Obtener competidores
      </Button>
      <Button className="btn btn-secondary mb-5 mt-5 ml-3" onClick={limpiarTabla} >
        Limpiar tabla
      </Button>
      <Button className="btn btn-success mb-5 mt-5 ml-3" onClick={exportToExcel}>
        Descargar Excel
      </Button>
      <div className="card">
        <DataTable value={data} stripedRows tableStyle={{ minWidth: "5rem" }}>
          <Column field="domains" header="Domains"></Column>
          <Column field="url" header="URL"></Column>
        </DataTable>
      </div>
    </div>
  );
}




















// import React, { useState } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";

// export default function Table() {
//   const [data, setData] = useState(null);
//   const [inputValue, setInputValue] = useState('');
//   const [buttonDisabled, setButtonDisabled] = useState(true);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     setButtonDisabled(value === "");
//   };

//   const obtenerData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/home/semrush",{
//         params: {
//           domain: inputValue
//         }
//       });
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const limpiarTabla = () => {
//     setData(null);
//   };

//   return (
//     <div>
//       <div className="card flex justify-content-center mt-5">
//         <InputText value={inputValue} onChange={handleInputChange} />
//       </div>
//       <Button className="btn btn-primary mt-5 mb-5" onClick={obtenerData} disabled={buttonDisabled}>
//         Obtener competidores
//       </Button>
//       <Button className="btn btn-secondary mb-5 ml-5" onClick={limpiarTabla}>
//         Limpiar tabla
//       </Button>
//       <div className="card">
//         <DataTable value={data} stripedRows tableStyle={{ minWidth: "5rem" }}>
//           <Column field="domains" header="Domains"></Column>
//           <Column field="url" header="URL"></Column>
//         </DataTable>
//       </div>
//     </div>
//   );
// }
