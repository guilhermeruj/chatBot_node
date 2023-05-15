function dialogocl1(client, message) {
  const menu = {
    header: "Olá, seja bem vindo de volta como podemos ajudar",
    subtitle: "Por favor, escolha uma das opções abaixo:",
    buttons: [
      { id: "Contratar", text: "Contratar novo pacote" },
      { id: "Atendente", text: "Falar com atendente" },
    ],
  };
  client
    .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
    .then(() => {
      console.log("Buttons sent.");
    })
    .catch((error) => console.error("Error when sending buttons", error));
}

export default dialogocl1;
