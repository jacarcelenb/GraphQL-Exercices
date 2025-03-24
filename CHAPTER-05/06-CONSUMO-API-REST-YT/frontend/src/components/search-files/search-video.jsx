import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SearchVideoComponent = ({ data }) => {
  const HtmlContent = (value) => {
      return (
        <a
          href={value.videos[0].player}
          target="_blank"
          rel="noopener noreferrer"
          className="p-button"
          style={{textDecoration: 'none'}}
        >
       <i className="pi pi-check" style={{ fontSize: '1rem' }}></i>
        </a>
      );

  };
  return (
    <div>
      <>
        <div className="container">
          <DataTable
            value={data}
            showGridlines
            stripedRows
            paginator
            rows={5}
            filterLocale="ES"
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage="No existen registros."
          >
            <Column sortable field="title" header="Título"></Column>

            <Column sortable field="description" header="Descripción"></Column>

            <Column
              field="thumbnail"
              header="Video"
              body={HtmlContent}
            ></Column>
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default SearchVideoComponent;
