async function dialogo6(client, message) {
  const texto =
    "*Olá, Tudo bem?* Aqui é o Rafael, seja bem vido da *BellaPizza.*\n------------------------------------------------------\nDigite o numero correspondente ao que voce deseja\n\n1 - Cardapio\n2-promoções\n3 - Fazer o seu pedido\n4 - Saber do seu Pedido\n5 - Falar com Nosso Atendente\n6 - Encerrar a Conversa";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo6;
