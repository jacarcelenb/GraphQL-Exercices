import { gql } from '@apollo/client';
import client from '../apollo';


const GET_ORDERS = gql`
  query GetOrders($ord_id: Int) {
    orders(ord_id: $ord_id) {
      ord_id
      usr_id
      ord_date
      ord_description
      detail {
        de_id
        ord_id
        usr_id
        piz_id
        de_subtotal
        de_total
      }
    }
  }
`;

const GET_DETAIL_ORDERS = gql`
  query GetDetailOrders($de_id: Int!) {
    detailOrders(de_id: $de_id) {
      de_id
      ord_id
      usr_id
      piz_id
      de_subtotal
      de_total
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ord_id
      usr_id
      ord_date
      ord_description
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      ord_id
      usr_id
      ord_date
      ord_description
    }
  }
`;

const DELETE_ORDER = gql`
  mutation DeleteOrder($ord_id: Int!) {
    deleteOrder(ord_id: $ord_id)
  }
`;

const CREATE_DETAIL_ORDER = gql`
  mutation CreateDetailOrder($input: CreateDetailOrderInput!) {
    createDetailOrder(input: $input) {
      de_id
      ord_id
      usr_id
      piz_id
      de_subtotal
      de_total
    }
  }
`;

const UPDATE_DETAIL_ORDER = gql`
  mutation UpdateDetailOrder($input: UpdateDetailOrderInput!) {
    updateDetailOrder(input: $input) {
      de_id
      ord_id
      usr_id
      piz_id
      de_subtotal
      de_total
    }
  }
`;

const DELETE_DETAIL_ORDER = gql`
  mutation DeleteDetailOrder($de_id: Int!) {
    deleteDetailOrder(de_id: $de_id)
  }
`;

// Funciones para realizar las operaciones CRUD para órdenes y detalle de órdenes

export const getOrders = async (ord_id) => {
  try {
    const { data } = await client.query({
      query: GET_ORDERS,
      variables: { ord_id },
    });
    return data.orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getDetailOrders = async (de_id) => {
  try {
    const { data } = await client.query({
      query: GET_DETAIL_ORDERS,
      variables: { de_id },
    });
    return data.detailOrders;
  } catch (error) {
    console.error('Error fetching detail orders:', error);
    throw error;
  }
};

export const createOrder = async (input) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_ORDER,
      variables: { input },
    });
    return data.createOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (input) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_ORDER,
      variables: { input },
    });
    return data.updateOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const deleteOrder = async (ord_id) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_ORDER,
      variables: { ord_id },
    });
    return data.deleteOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

export const createDetailOrder = async (input) => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_DETAIL_ORDER,
      variables: { input },
    });
    return data.createDetailOrder;
  } catch (error) {
    console.error('Error creating detail order:', error);
    throw error;
  }
};

export const updateDetailOrder = async (input) => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_DETAIL_ORDER,
      variables: { input },
    });
    return data.updateDetailOrder;
  } catch (error) {
    console.error('Error updating detail order:', error);
    throw error;
  }
};

export const deleteDetailOrder = async (de_id) => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_DETAIL_ORDER,
      variables: { de_id },
    });
    return data.deleteDetailOrder;
  } catch (error) {
    console.error('Error deleting detail order:', error);
    throw error;
  }
};
