async function dialogo2(client, message) {
  const texto =
    "Para acessar o nosso cardápio clique no link abaixo:\n\nhttps://bit.ly/cardapiobellapizzaudi";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo2;
