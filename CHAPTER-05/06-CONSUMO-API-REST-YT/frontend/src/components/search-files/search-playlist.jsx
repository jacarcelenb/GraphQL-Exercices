import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Panel } from 'primereact/panel';


const SearchPlaylistComponent = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [channel, setChannel] = useState([]);

  const setData = (value) => {
    setVisible(true);
    setChannel(value);
  };
  const HtmlContent = (value) => {
    console.log(value);
    return (
      <>
        <Button icon="pi pi-external-link" onClick={() => setData(value)} />
      </>
    );
  };

  const VideoContent = (value) => {
    return (
      <a
        href={"https" + value.player.substring(42, 118)}
        target="_blank"
        rel="noopener noreferrer"
        className="p-button"
        style={{ textDecoration: "none" }}
      >
        <i className="pi pi-check" style={{ fontSize: "1rem" }}></i>
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
              header="Detalle"
              body={HtmlContent}
            ></Column>
          </DataTable>
        </div>
      </>

      <div className="card flex justify-content-center">
        <Dialog
          header="Canal"
          visible={visible}
          style={{ width: "60vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
            <p className="m-0">{channel.title}</p>
            <img
              src={channel.thumbnail?.url}
              alt="Image"
              width="150"
              style={{ borderRadius: "100%", border: "5px solid black" }}
            />
           <br />
           <br />
          <Panel header="Descripción">
            <p className="m-0">{channel.description}</p>
          </Panel>

          <Panel header="Lista de reproducción">
            <div className="container">
              <DataTable
                value={channel.playlists}
                showGridlines
                stripedRows
                paginator
                rows={5}
                filterLocale="ES"
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "10rem" }}
                emptyMessage="No existen registros."
              >
                <Column sortable field="title" header="Título"></Column>

                <Column
                  field="player"
                  style={{textAlign: "center"}}
                  header="Lista de reproducción"
                  body={VideoContent}
                ></Column>
              </DataTable>
            </div>
          </Panel>
        </Dialog>
      </div>
    </div>
  );
};

export default SearchPlaylistComponent;
