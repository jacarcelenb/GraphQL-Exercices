import { useState } from 'react'

import { Panel } from "primereact/panel";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Sidebar } from "primereact/sidebar";
import PopularVideoComponent from "./components/popular-videos/popularvideos.jsx";
import {
  GET_SEARCH_VIDEOS,
  GET_SEARCH_CHANNELS
} from "./services/api-service";
import { useLazyQuery } from "@apollo/client";
import SearchVideoComponent from "./components/search-files/search-video.jsx";
import SearchPlaylistComponent from "./components/search-files/search-playlist.jsx";

function App() {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("Videos Populares");
  const [getVideos, result] = useLazyQuery(GET_SEARCH_VIDEOS);
  const [getChannels, channelList] = useLazyQuery(GET_SEARCH_CHANNELS);


  const showVideos = () => {
    getVideos({ variables: { filter: searchTerm } })
  };

  const showChannels = () => {
    getChannels({ variables: { filter: searchTerm } })
  };

  const searchResources = () => {
    if (searchOption === "Videos") {
      showVideos();
      setSearchTerm("")
    } else if (searchOption === "Canales") {
      showChannels();
      setSearchTerm("")
    } else {
      setSearchOption("Videos Populares")
      setSearchTerm("")
    }
  };

  const startContent = (
      <i
        className="pi pi-youtube"
        style={{ fontSize: "2rem", color: "red", marginTop: "-24px" }}
      ></i>

  );



  const centerContent = (
    <IconField iconPosition="left" style={{ marginTop: "-15px" }}>
      <InputIcon className="pi pi-search" onClick={searchResources}/>
      <InputText
        placeholder="Search"
        size={80}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </IconField>
  );

  const endContent = (
      <Button
        text
        icon="pi pi-bars"
        onClick={() => setVisible(true)}
        style={{ color: "black", marginTop: "-14px" }}
      ></Button>
  );

  return (
    <div className="App">
      <div className="card">
        <Toolbar
          start={startContent}
          center={centerContent}
          end={endContent}
          style={{ height: 60 }}
        />
      </div>
      <br />
      <Panel header={searchOption}>


          {searchOption === "Videos Populares" && <PopularVideoComponent></PopularVideoComponent>}
          {searchOption === "Videos" && <SearchVideoComponent data={result.data?.SearchVideos} ></SearchVideoComponent>}
          {searchOption === "Canales" && <SearchPlaylistComponent data={channelList.data?.SearchChannels} ></SearchPlaylistComponent>}

      </Panel>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
      >
        <h2>
          {" "}
          <i
            className="pi pi-youtube"
            style={{ fontSize: "1.5rem", color: "red", marginRight: "5px" }}
          ></i>
          Youtube
        </h2>
        <Button
          icon="pi pi-youtube"
          label="Videos Populares"
          severity="secondary"
          text
          onClick={()=>{setSearchOption("Videos Populares")}}
        />
        <Button
        icon="pi pi-youtube"
        label="Videos"
        severity="secondary"
        text
        onClick={()=>{setSearchOption("Videos")}}/>
        <br />
        <Button
          icon="pi pi-youtube"
          label="Canales"
          severity="secondary"
          text
          onClick={()=>{setSearchOption("Canales")}}
        />
      </Sidebar>
    </div>
  );
}

export default App
