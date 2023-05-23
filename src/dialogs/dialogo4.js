async function dialogo6(client, message) {
  const texto =
    "*Agora me informe qual o numero da pizza!*\n\n você pode consultar o link do cardápio";
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
