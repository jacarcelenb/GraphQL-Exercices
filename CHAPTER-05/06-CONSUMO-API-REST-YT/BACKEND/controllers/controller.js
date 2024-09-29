const axios = require("axios");
const envVars = require("../config/env-vars.js");
const API_KEY = envVars.API_TOKEN;
const { getFrameURl } = require("../services/query-service.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const resolvers = {
  Query: {
    video: async (root, { maxresults }) => {
      let numResults = 20;
      if (maxresults !== undefined) {
        numResults = maxresults;
      }

      const response = await fetch(
        `${envVars.API_URL}videos?&key=${API_KEY}&part=player,contentDetails,topicDetails,snippet&chart=mostPopular&maxResults=${numResults}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          return data.items;
        })
        .catch((error) => {
          return error;
        });

      return response.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: getFrameURl(item),
      }));
    },
    SearchChannels: async (root, { filter }) => {
      if (filter !== undefined) {
        const response = await fetch(
          `${envVars.API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=channel`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
        if (response.items !== undefined) {
          return response.items.map((item) => ({
            id: item.id.channelId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default,
          }));
        } else {
          return [];
        }
      } else {
        throw new Error("Debe el filtro para buscar");
      }
    },
    SearchVideos: async (root, { filter }) => {
      if (filter !== undefined) {
        const response = await fetch(
          `${envVars.API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=video`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
        if (response.items !== undefined) {
          return response.items.map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default,
          }));
        } else {
          return [];
        }
      } else {
        throw new Error("Debe el filtro para buscar");
      }
    },
    SearchPlaylists: async (root, { filter }) => {
      if (filter !== undefined) {
        const response = await fetch(
          `${envVars.API_URL}search?key=${API_KEY}&part=snippet&q=${filter}&type=playlist`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            return data;
          })
          .catch((error) => {
            return error;
          });
        if (response.items !== undefined) {
          return response.items.map((item) => ({
            id: item.id.playlistId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default,
          }));
        } else {
          return [];
        }
      } else {
        throw new Error("Debe el filtro para buscar");
      }
    },
  },
  Channel: {
    async playlists(channel) {
      if (channel !== undefined) {
        const response = await fetch(
          `${envVars.API_URL}playlists?&key=${API_KEY}&part=player,snippet&channelId=${channel.id}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            return data.items;
          })
          .catch((error) => {
            return error;
          });

        return response.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          channelTitle: item.snippet.channelTitle,
          player: item.player.embedHtml,
        }));
      } else {
        return [];
      }
    },
  },

  SearchVideo:{
   async videos(video){
    if (video !== undefined) {
      const response = await fetch(
        `${envVars.API_URL}videos?&key=${API_KEY}&part=player,contentDetails,topicDetails,snippet&id=${video.id}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then(async (data) => {
          return data.items;
        })
        .catch((error) => {
          return error;
        });
      return response.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        player: getFrameURl(item),
      }));
    } else {
      return [];
    }
   }
  }
};

module.exports = resolvers;
