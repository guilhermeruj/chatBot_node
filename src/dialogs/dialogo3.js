async function dialogo6(client, message) {
  const texto =
    "*Vamos dar inicio ao seu atendimento*\n\nInforme por favor o seu nome!";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo6;
