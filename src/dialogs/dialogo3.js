async function dialogo6(client, message) {
  const texto =
    "Informe seu nome para iniciarmos o atendimento!";
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
