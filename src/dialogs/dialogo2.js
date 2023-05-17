function dialogo2(client, message) {
  client
  .sendText(
    message.from,
    "Para acessar o nosso cardápio clique no link abaixo:\n\n (linkDaPizzaria)",
    { quotedMessage: message }
  )
  .then(() => {
    console.log("Message sent.");
  })
  .catch((error) => {
    console.error("Error when sending message", error);
  });
}
export default dialogo2;
