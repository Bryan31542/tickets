// HTMLs Refs
const lblDesk = document.querySelector("h1");
const btnAttend = document.querySelector("button");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}

const desk = searchParams.get("escritorio");
lblDesk.innerText = desk;

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
  socket.emit("attend-ticket", { desk }, (payload) => {
    console.log(payload);
  });

  //   socket.emit("next-ticket", null, (ticket) => {
  //     lblNewTicket.innerText = ticket;
  //   });
});
