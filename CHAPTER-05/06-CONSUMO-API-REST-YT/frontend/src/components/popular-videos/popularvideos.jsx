import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POPULAR_VIDEOS } from "../../services/api-service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PopularVideoComponent = () => {
  const popularVideoList = useQuery(GET_POPULAR_VIDEOS);

  const HtmlContent = (video) => {

    return (
      <iframe
        width="300"
        height="150"
        src={video.player}
      ></iframe>
    );
  };
  return (
    <div>
      <>
        <div className="container">
          <DataTable
            value={popularVideoList.data?.video}
            showGridlines
            stripedRows
            paginator
            rows={5}
            filterLocale="ES"
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage="No existen registros."
          >
            <Column sortable field="channelTitle" header="Canal"></Column>

            <Column sortable field="title" header="Título"></Column>

            <Column
              field="player"
              header="Video"
              body={HtmlContent}
            ></Column>
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default PopularVideoComponent;
