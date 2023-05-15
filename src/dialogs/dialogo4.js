function dialogo4(client, message) {
  const menu = {
    header: "A instalação seria em casa, prédio, condomínio?",
    subtitle: "Por favor, escolha uma das opções abaixo:",
    buttons: [
      { id: "casa", text: "CASA" },
      { id: "prédio", text: "PRÉDIO" },
      { id: "condomínio", text: "CONDOMÍNIO" },
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
