async function dialogo5(client, message) {
  const texto =
    "*Informe o endereço da sua residencia com numero, rua e bairro*";
  await client
    .sendText(message.from, texto)
    .then(() => {
      console.log("Mensagem enviada.");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem", error);
    });
}
export default dialogo5;
