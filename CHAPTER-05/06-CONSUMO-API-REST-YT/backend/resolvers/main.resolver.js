import { config } from "../config/env-vars.js";
const API_KEY = config.API_TOKEN;
const API_URL = config.API_URL;
import { getFrameURl } from "../services/query-service.js";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const resolver = {
  Query: {
    video: async (_root, { maxresults }) => {
      let numResults = maxresults || 20;
      const response = await fetch(
        `${API_URL}videos?&key=${API_KEY}&part=player,contentDetails,topicDetails,snippet&chart=mostPopular&maxResults=${numResults}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: getFrameURl(item),
      })) || [];
    },
    SearchChannels: async (_root, { filter }) => {
      if (!filter) throw new Error("Debe proporcionar un filtro para buscar");

      const response = await fetch(
        `${API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=channel`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id.channelId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default,
      })) || [];
    },
    SearchVideos: async (_root, { filter }) => {
      if (!filter) throw new Error("Debe proporcionar un filtro para buscar");

      const response = await fetch(
        `${API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=video`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default,
      })) || [];
    },
    SearchPlaylists: async (_root, { filter }) => {
      if (!filter) throw new Error("Debe proporcionar un filtro para buscar");

      const response = await fetch(
        `${API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=playlist`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id.playlistId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default,
      })) || [];
    },
    listVideo: async (_root, { id }) => {
      if (!id) throw new Error("Debe proporcionar un ID válido");

      const response = await fetch(
        `${API_URL}videos?&key=${API_KEY}&part=snippet&id=${id}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: getFrameURl(item),
      })) || [];
    },
  },

  Channel: {
    playlists: async (channel) => {
      if (!channel) return [];

      const response = await fetch(
        `${API_URL}playlists?&key=${API_KEY}&part=player,snippet&channelId=${channel.id}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: item.player.embedHtml,
      })) || [];
    },
  },

  SearchVideo: {
    videos: async (video) => {
      if (!video) return [];

      const response = await fetch(
        `${API_URL}videos?&key=${API_KEY}&part=player,contentDetails,topicDetails,snippet&id=${video.id}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .catch((error) => error);

      return response.items?.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: getFrameURl(item),
      })) || [];
    },
  },
};

export default resolver;
