import { gql } from "@apollo/client";

const GET_ROLE_MENU = gql`
  {
    rolemenus {
      rm_id
      mn_id
      rm_status
      rol_id
    }
  }
`;

const GET_USER_MENU = gql`
query ($rolId: Int) {
  rolemenus(rol_id: $rolId) {
    menus {
      mn_id
      mn_name
      mn_route
      mn_icon
    }
  }
}
`;



const CREATE_ROLE_MENU = gql`
  mutation addRoleMenu($input: RoleMenuInput!) {
    addRoleMenu(input: $input) {
      mn_id
      rm_status
      rol_id
    }
  }
`;

const UPDATE_ROLE_MENU = gql`
  mutation updateRoleMenu($input: RoleMenuUpdateInput!) {
    updateRoleMenu(input: $input) {
      mn_id
      rm_status
      rol_id
    }
  }
`;

const DELETE_ROLE_MENU = gql`
  mutation deleteRoleMenu($rmId: Int!) {
    deleteRoleMenu(rm_id: $rmId)
  }
`;

export {
    GET_ROLE_MENU,
    CREATE_ROLE_MENU,
    UPDATE_ROLE_MENU,
    DELETE_ROLE_MENU,
    GET_USER_MENU
};
