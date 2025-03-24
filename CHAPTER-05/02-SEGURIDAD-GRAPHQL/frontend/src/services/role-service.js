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


export { GET_ROLES };