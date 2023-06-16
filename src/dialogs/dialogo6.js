async function dialogo6(client, message) {
  const texto =
    "*Por favor nos diga quais serão as metades desejadas.*";
  await client
    .sendText(message.from, texto, { quotedMessage: message })
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo6;
