function dialogo1(client, message) {
  client
  .sendText(
    message.from,
    "*Olá, Tudo bem?* Aqui é o Rafael, seja bem vido da *BellaPizza.*\n------------------------------------------------------\nDigite o numero correspondente ao que você deseja\n\n1 - Cardápio\n2 - Promoções\n3 - Fazer o seu pedido\n4 - Falar com Nosso Atendente\n5 - Encerrar a Conversa",
    { quotedMessage: message }
  )
  .then(() => {
    console.log("Message sent.");
  })
  .catch((error) => {
    console.error("Error when sending message", error);
  });
}

export default dialogo1;