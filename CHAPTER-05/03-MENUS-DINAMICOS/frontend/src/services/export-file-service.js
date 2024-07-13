import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { isAvailable } from "./util-service";

const exportCSV = (dt, selectionOnly) => {
  dt.current.exportCSV({ selectionOnly });
};

const formatPizzaFields = (list) => {
  console.log(list);
  let formatedList = [];
  let piz_state = "";

  if (list !== undefined) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.piz_state) {
        piz_state = "Activa";
      } else {
        piz_state = "Inactiva";
      }
      formatedList.push([element.piz_name, element.piz_origin, piz_state]);
    }
  }

  return formatedList;
};

const formatIngredientsFields = (list) => {
  let formatedList = [];
  let state = "";

  if (list !== undefined) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.ing_state) {
        state = "Activo";
      } else {
        state = "Inactivo";
      }
      formatedList.push([element.ing_name, element.ing_calories, state]);
    }
  }

  return formatedList;
};

const formatUserFields = (list) => {
  let formatedList = [];
  let state = "";
  if (list !== undefined) {
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.usr_status) {
        state = "Activo";
      } else {
        state = "Inactivo";
      }
      formatedList.push([element.usr_name, element.usr_email, state]);
    }
  }

  return formatedList;
};

const exportPdf = async (data, name, colums) => {
  const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });
  let date = new Date();
  let fecha = date.toLocaleDateString();

  autoTable(doc, {
    body: [
      [
        {
          content: name,
          styles: {
            halign: "left",
            fontSize: 9,
            fontStyle: "bold",
            textColor: "#ffffff",
          },
        },
        {
          content: fecha,
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 9,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#0939B0",
    },
  });
  autoTable(doc, {
    head: [colums],
    body: data,
    theme: "striped",
  });
  doc.save(name + ".pdf");
};

const exportReportPdf = async (item, name, colums) => {
  const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });
  let date = new Date();
  let fecha = date.toLocaleDateString();
  autoTable(doc, {
    body: [
      [
        {
          content: name,
          styles: {
            halign: "left",
            fontSize: 9,
            fontStyle: "bold",
            textColor: "#ffffff",
          },
        },
        {
          content: fecha,
          styles: {
            halign: "right",
            fontStyle: "bold",
            fontSize: 9,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#0939B0",
    },
  });

  autoTable(doc, {
    body: [["Información"]],
    theme: "plain",
    styles: {
      fontStyle: "bold",
    },
  });

  autoTable(doc, {
    body: [
      ["Nombre: " + item.piz_name],
      ["Origen: " + item.piz_origin],
      ["Estado: " + isAvailable(item.piz_state)],
    ],
    theme: "grid",
  });

  autoTable(doc, {
    body: [["Ingredientes de la Pizza "]],
    theme: "plain",
    styles: {
      fontStyle: "bold",
    },
  });

  autoTable(doc, {
    head: [colums],
    body: formatIngredientsFields(item.ingredients),
    theme: "striped",
  });

  autoTable(doc, {
    body: [["Total de Calorías: " + item.total_calories]],
    theme: "plain",
    styles: {
      fontStyle: "bold",
    },
  });

  doc.save(name + ".pdf");
};

const exportExcel = (data, name) => {
  import("xlsx").then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, name);
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import("file-saver").then((module) => {
    if (module && module.default) {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      });

      module.default.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    }
  });
};

export {
  exportCSV,
  exportExcel,
  saveAsExcelFile,
  exportPdf,
  formatPizzaFields,
  formatIngredientsFields,
  formatUserFields,
  exportReportPdf,
};
