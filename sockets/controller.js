const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  // When the client connects
  socket.emit("last-ticket", ticketControl.last);
  socket.emit("actual-status", ticketControl.lastFour);
  socket.emit("pending-tickets", ticketControl.tickets.length);

  socket.on("next-ticket", (payload, callback) => {
    const nextTicket = ticketControl.nextTicket();
    callback(nextTicket);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);
  });

  socket.on("attend-ticket", ({ desk }, callback) => {
    if (!desk) {
      return callback({
        ok: false,
        message: "The desk is required",
      });
    }

    const attendTicket = ticketControl.attendTicket(desk);

    // Updating the last four
    socket.broadcast.emit("actual-status", ticketControl.lastFour);
    socket.emit("pending-tickets", ticketControl.tickets.length);
    socket.broadcast.emit("pending-tickets", ticketControl.tickets.length);

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
