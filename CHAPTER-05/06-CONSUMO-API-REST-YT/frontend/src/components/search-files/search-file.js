import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SearchFileComponent = ({data}) => {

  const HtmlContent = (video) => {

    return (
      <img
        width="200"
        height="150"
        src={video.thumbnail.url}
        alt=""

      ></img>
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
              header="Imagen"
              body={HtmlContent}
            ></Column>
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default SearchFileComponent;
