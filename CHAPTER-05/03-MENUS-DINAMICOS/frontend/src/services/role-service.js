import { gql } from '@apollo/client';


const GET_ROLES = gql`

  {
    roles {
      rol_id
      rol_description
      rol_status
    }
  }

`;
const CREATE_ROLE = gql`
mutation createRole($input: CreateRoleInput) {
  createRole(input: $input) {
    rol_description
    rol_id
    rol_status
  }
}
`;


const UPDATE_ROLE = gql`
mutation updateRole($input: UpdateRoleInput){
  updateRole(input: $input) {
    rol_id
    rol_description
     rol_status
  }
}
`;

const DELETE_ROLE = gql`
mutation deleteRole($rolId: Int!){
  deleteRole(rol_id: $rolId)
  }

`;



export { GET_ROLES, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE };