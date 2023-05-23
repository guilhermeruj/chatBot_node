async function dialogo1(client, message) {
  const texto = "*Olá, Tudo bem?* Aqui é o Rafael, seja bem vindo a *BellaPizza🍕*.*\n------------------------------------------------------\nDigite o numero correspondente ao que você deseja\n\n1 - Cardápio\n2 - Promoções\n3 - Fazer o seu pedido\n4 - Falar com Nosso Atendente ou consultar pedido\n5 - Encerrar a Conversa"

  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log('Result: ', "result"); //return object success
    })
    .catch((erro) => {
      console.error('Erro ao enviar mensagem ', erro); //return object error
    });
}

export default dialogo1;
