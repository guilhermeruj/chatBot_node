function dialogo2(client, message) {
  const menu = {
    header: "Escolha uma cidade:",
    subtitle: "Por favor, escolha uma das opções abaixo:",
    buttons: [
      { id: "Uberlandia", text: "Uberlândia" },
      { id: "Uberaba", text: "Uberaba" },
    ],
  };
  client
    .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
    .then(() => {
      console.log("Buttons sent.");
    })
    .catch((error) => console.error("Error when sending buttons", error));
    client.onMessage((message) => {
      if (!message.isGroupMsg) {
        client.resposta2 = message.body;
        console.log("Resposta do cliente:", client.resposta2, client.resposta1);
        dialogo3(client, message);
      }
    });
}
export default dialogo2;
