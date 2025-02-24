const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

import { config } from "../config/env-vars.js";
const resolver = {
  Query: {
    async chatbot(root, { prompt }) {
      if (prompt == undefined) {
        throw new Error("Debe ingresar un prompt ");
      } else {
        const url = config.API_URL + config.API_TOKEN;
        const headers = {
          "Content-Type": "application/json",
        };
        const data = {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        };

        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (data) => {
            return data.candidates[0].content.parts[0].text;
          })
          .catch((error) => {
            return error;
          });

        return response;
      }
    },
  },
  Mutation: {
    async SendPrompt(root, { prompt }) {
      if (prompt == undefined) {
        throw new Error("Debe ingresar un prompt ");
      } else {
        const url = config.API_URL + config.API_TOKEN;
        const headers = {
          "Content-Type": "application/json",
        };
        const data = {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        };

        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then(async (data) => {
            return data.candidates[0].content.parts[0].text;
          })
          .catch((error) => {
            return error;
          });

        return response;
      }
    },
  },
};
export default resolver;