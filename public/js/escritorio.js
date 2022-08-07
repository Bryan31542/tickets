// HTMLs Refs
const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlert = document.querySelector(".alert");
const lblPending = document.querySelector("#lblPendientes");

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

socket.on("pending-tickets", (pending) => {
  if (pending === 0) {
    lblPending.style.display = "none";
  } else {
    lblPending.style.display = "";
    lblPending.innerText = pending;
  }
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
