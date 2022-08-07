const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);

  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);

    //TODO: Notify new ticket
  });

  socket.on("attend-ticket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        message: "The desk is required",
      });
    }

    const attendTicket = ticketControl.attendTicket(desk);

    if (!attendTicket) {
      return callback({
        ok: false,
        message: "There are no tickets available",
      });
    } else {
      return callback({
        ok: true,
        message: "Ticket attended",
        ticket: attendTicket,
      });
    }
  });
};

module.exports = {
  socketController,
};
