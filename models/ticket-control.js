const path = require("path");
const fs = require("fs");

class Ticket {
  constructor(number, desk) {
    this.number = "";
    this.desk = "";
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];

    this.init();
  }

  get toJSON() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
  }

  init() {
    const { today, tickets, lastFour, last } = require("../db/data.json");

    if (today === this.today) {
      this.last = last;
      this.tickets = tickets;
      this.lastFour = lastFour;
    } else {
      // es otro dia
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJSON));
  }

  nextTicket() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.saveDB();

    return `Ticket ${this.number}`;
  }

  attendTicket(desk) {
    // No tickets
    if (this.tickets.length === 0) {
      return null;
    }

    const ticket = this.tickets.shift();
    ticket.desk = desk;

    // adding at the begining of the array
    this.lastFour.unshift(ticket);

    // if the array is greater than 4, remove the last element
    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }

    this.saveDB();

    return ticket;
  }
}

module.exports = TicketControl;
