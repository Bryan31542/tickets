const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);

    //TODO: Notify new ticket
  });
};

module.exports = {
  socketController,
};
