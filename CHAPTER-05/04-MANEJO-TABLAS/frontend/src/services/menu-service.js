import { gql } from "@apollo/client";
const GET_MENUS = gql`
  {
    menus {
      mn_id
      mn_name
      mn_route

    }
  }
`;

export { GET_MENUS };
