function dialogo6(client, message) {
  client
    .sendText(
      message.from,
      "*Olá, Tudo bem?* Aqui é o Rafael, seja bem vido da *BellaPizza.*\n------------------------------------------------------\nDigite o numero correspondente ao que voce deseja\n\n1 - Cardapio\n2-promoções\n3 - Fazer o seu pedido\n4 - Saber do seu Pedido\n5 - Falar com Nosso Atendente\n6 - Encerrar a Conversa",
      { quotedMessage: message }
    )
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Error when sending message", error);
    });
}
export default dialogo6;
