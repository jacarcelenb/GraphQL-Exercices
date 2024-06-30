const Order = require("../models/order");
const DetailOrder = require("../models/detailorder");
const {getDetailbyOrder} = require("../models/complex-queries");
const orderResolver = {
  Query: {
    orders: async (_, { ord_id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          return await Order.findByPk(ord_id);
        } catch (error) {
          throw new Error("Error fetching order");
        }
      }
    },
    detailOrders: async (_, { de_id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          return await DetailOrder.findByPk(de_id);
        } catch (error) {
          throw new Error("Error fetching detail order");
        }
      }
    },
  },
  Mutation: {
    createOrder: async (_, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const { usr_id, ord_date, ord_description } = input;
        try {
          return await Order.create({ usr_id, ord_date, ord_description });
        } catch (error) {
          throw new Error("Error creating order");
        }
      }
    },
    updateOrder: async (_, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const { ord_id, usr_id, ord_date, ord_description } = input;
        try {
          const order = await Order.findByPk(ord_id);
          if (!order) {
            throw new Error("Order not found");
          }
          await order.update({ usr_id, ord_date, ord_description });
          return order;
        } catch (error) {
          throw new Error("Error updating order");
        }
      }
    },
    deleteOrder: async (_, { ord_id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          const order = await Order.findByPk(ord_id);
          if (!order) {
            throw new Error("Order not found");
          }
          await order.destroy();
          return true;
        } catch (error) {
          throw new Error("Error deleting order");
        }
      }
    },
    createDetailOrder: async (_, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const { ord_id, usr_id, piz_id, de_subtotal, de_total } = input;
        try {
          return await DetailOrder.create({
            ord_id,
            usr_id,
            piz_id,
            de_subtotal,
            de_total,
          });
        } catch (error) {
          throw new Error("Error creating detail order");
        }
      }
    },
  },
  orders: {
    async detail(order) {
      return getDetailbyOrder(order.ord_id);
    }
  },
};

module.exports = orderResolver;
