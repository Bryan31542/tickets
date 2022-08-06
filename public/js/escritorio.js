// HTMLs Refs
const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblDesk.innerText = escritorio;

const socket = io();

socket.on("connect", () => {
  btnCreate.disabled = false;
});

socket.on("disconnect", () => {
  btnCreate.disabled = true;
});

socket.on("last-ticket", (last) => {
//   lblNewTicket.innerText = "Ticket " + last;
});

btnAttend.addEventListener("click", () => {
//   socket.emit("next-ticket", null, (ticket) => {
//     lblNewTicket.innerText = ticket;
//   });
});
