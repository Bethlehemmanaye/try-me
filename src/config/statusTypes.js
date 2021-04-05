export const statusTypes = {
  OPEN: "open",
  ORDER_ACCEPTED: "order accepted",
  OUT_FOR_DELIVERY: "out for delivery",
  DELIVERED: "deliverd",
  CLOSED: "closed"
};

export default statusTypes;

export const statuses = Object.values(statusTypes);
