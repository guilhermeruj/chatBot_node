export function inicioDialogo(client, message) {
  const menu = {
    header: "Escolha uma opção:",
    content:
      "👋 *Saudação*\n\nTudo bem? Aqui é o Rafael da *BellaPizza.*\n\nComo posso ajudar você a fazer o seu pedido?🙋‍♂️",
    buttons: [
      { id: "Cardápio", text: "Ver o Cardápio" },
      { id: "PROMOÇOES", text: "Promoções do Cardápio" },
      { id: "Fazer o seu pedido", text: "Numero da Pizza, Nome,Endereço" },
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
