export function inicioDialogo(client, message) {
  const menu = {
    header: "Escolha uma opção:",
    content:
      "👋 Que bom que você gostou da nossa oferta.\n Eu sou o consultor virtual da Click e vou dar continuidade ao seu atendimento\n 🙋‍♂️",
    buttons: [
      { id: "1", text: "Quero contratar" },
      { id: "2", text: "Quais os planos" },
      { id: "3", text: "Falar com o atendente" },
    ],
  };

  client
    .sendButtons(message.from, menu.content, menu.buttons, menu.header)
    .then(() => {
      console.log("Buttons sent.");
      return;
    })
    .catch((error) => console.error("Error when sending buttons", error));
}
