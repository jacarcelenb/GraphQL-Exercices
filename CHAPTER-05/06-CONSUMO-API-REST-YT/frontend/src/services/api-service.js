import { gql } from "@apollo/client";
const GET_POPULAR_VIDEOS = gql`
  {
    video {
      title
      channelTitle
      player
    }
  }
`;

const GET_SEARCH_CHANNELS = gql`
  query ($filter: String!) {
    SearchChannels(filter: $filter) {
      id
      title
      description
      thumbnail {
        url
      }
      playlists {
      title
      channelTitle
      player
      id
    }
    }
  }
`;




const GET_SEARCH_PLAYLISTS = gql`
  query ($filter: String!) {
    SearchPlaylists(filter: $filter) {
      id
      title
      description
      thumbnail {
        url
      }
    }
  }
`;

const GET_VIDEOS_BY_ID = gql`
query ($listVideoId: String) {
  listVideo(id: $listVideoId) {
    id
    title
    channelTitle
    player
  }
}
`;

const GET_SEARCH_VIDEOS = gql`
  query ($filter: String!) {
    SearchVideos(filter: $filter) {
      id
      title
      description
      thumbnail {
        url
      }
      videos {
      player
     }
    }
  }
`;

export {
  GET_POPULAR_VIDEOS,
  GET_SEARCH_CHANNELS,
  GET_SEARCH_PLAYLISTS,
  GET_SEARCH_VIDEOS,
  GET_VIDEOS_BY_ID
};
