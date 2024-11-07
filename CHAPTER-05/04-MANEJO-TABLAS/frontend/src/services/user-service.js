import { gql } from "@apollo/client";


const GET_USERS = gql`
  query GetUsers($usr_id: Int) {
    users(usr_id: $usr_id) {
      usr_id
      usr_name
      usr_email
      usr_status
      rol_id
      user_token
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($usr_email: String!, $usr_password: String!) {
    loginUser(usr_email: $usr_email, usr_password: $usr_password) {
      usr_id
      usr_name
      usr_email
      usr_status
      rol_id
      user_token
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($user: addUser!) {
    createUser(user: $user) {
      usr_id
      usr_name
      usr_email
      usr_status
      rol_id
      user_token
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($user: modifyUser!) {
    updateUser(user: $user) {
      usr_id
      usr_name
      usr_email
      usr_status
      rol_id
      user_token
    }
  }
`;

const DELETE_USER = gql`
 mutation deleteUser($deleteUserId: ID!){
  deleteUser(id: $deleteUserId)
}
`;

export { GET_USERS, LOGIN_USER, CREATE_USER, UPDATE_USER, DELETE_USER };
