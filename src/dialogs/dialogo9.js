async function dialogo9(client, message) {
  const texto = "*Por gentileza informe a alteração desejada no pedido*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("MMensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo9;
