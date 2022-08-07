// HTMLs Refs
const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const desk = searchParams.get("escritorio");
lblDesk.innerText = desk;

divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnAttend.disabled = false;
});

socket.on("disconnect", () => {
  btnAttend.disabled = true;
});

socket.on("last-ticket", (last) => {
  //   lblNewTicket.innerText = "Ticket " + last;
});

btnAttend.addEventListener("click", () => {
  socket.emit("attend-ticket", { desk }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie";
      return (divAlert.style.display = "");
    }

    lblTicket.innerText = "Ticket " + ticket.number;
  });
});
