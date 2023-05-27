async function dialogo4(client, message) {
  const texto =
    "*Agora me informe qual o numero da pizza!*\n\nVocê pode consultar o link do cardápio e verificar um numero.\nhttps://bit.ly/cardapiobellapizzaudi";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo4;
