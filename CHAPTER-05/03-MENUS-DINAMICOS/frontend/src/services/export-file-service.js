import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { isAvailable } from "./util-service";
import image from "../assets/images/pizza.jpg";
import logo from "../assets/images/pizza-logo.jpg";
import Pizzalogo from "../assets/images/bg_1.png";
import codeQR from "../assets/images/TEST.png";
const exportCSV = (dt, selectionOnly) => {
  dt.current.exportCSV({ selectionOnly });
};

const formatPizzaFields = (list) => {
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
      formatedList.push([element.ing_name, element.ing_calories,element.pi_portion, state]);
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
  doc.addImage(image, 10, 5, 20, 20);
  doc.addImage(logo, 180, 5, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.text("Pizza GraphQL", 80, 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Av. República de El Salvador", 80, 20);
  doc.text("099 250 3272", 90, 24);
  doc.text("pizzagraphql@gmail.com", 83, 28);
  doc.setFont("helvetica", "bold");
  doc.text(
    "_________________________________________________________________________________________________________________________",
    10,
    30
  );
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Información", 15, 40);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Fecha: " + fecha, 15, 45);
  doc.text(
    "Hora: " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    15,
    50
  );
  doc.text("Nombre: " + item.piz_name, 15, 55);
  doc.text("Origen: " + item.piz_origin, 15, 60);
  doc.text("Estado: " + isAvailable(item.piz_state), 15, 65);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Detalle", 15, 75);
  doc.addImage(Pizzalogo, 80, 35, 35, 35);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  autoTable(doc, {
    head: [colums],
    body: formatIngredientsFields(item.ingredients),
    theme: "striped",
    startY: 78,
    halign: "LEFT",
    styles: {
      fontStyle: "normal",
      fontSize: 8,
    },
  });

  autoTable(doc, {
    body: [["Total de Calorías: " + item.total_calories]],
    theme: "plain",
    styles: {
      fontStyle: "normal",
      fontSize: 8,
    },
  });

  doc.text("Escanea el código:",20, 258)
  doc.text("Página "+ doc.getNumberOfPages(),170, 290)
  doc.addImage(codeQR, 15, 260, 35, 35);



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
