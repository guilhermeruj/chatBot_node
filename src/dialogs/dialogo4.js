function dialogo4(client, message) {
  const menu = {
    header: "O pedido está correto?",
    subtitle: "Por favor, escolha uma das opções abaixo:",
    buttons: [
      { id: "Sim", text: "SIM" },
      { id: "Nao", text: "NÃO" },
    ],
  };
  client
    .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
    .then(() => {
      console.log("Buttons sent.");
    })
    .catch((error) => console.error("Error when sending buttons", error));
}
export default dialogo4;
