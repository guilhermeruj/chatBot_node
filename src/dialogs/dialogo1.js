import dialogo2 from "./dialogo2.js";

function dialogo1(client, message) {
  const menu = {
    header: "Você já é nosso cliente?",
    subtitle: "Por favor, escolha uma das opções abaixo:",
    buttons: [
      { id: "sim", text: "SIM" },
      { id: "nao", text: "NÃO" },
    ],
  };
  client
    .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
    .then(() => {
      console.log("Buttons sent.");
    })
    .catch((error) => console.error("Error when sending buttons", error));
}

export default dialogo1;
