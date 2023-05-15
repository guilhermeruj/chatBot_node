function dialogo6(client, message, session) {
  client
    .sendText(
      message.from,
      "Tem algum *complemento*? (Digite 'Não' caso não tenha)",
      { quotedMessage: message }
    )
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Error when sending message", error);
    });
}
export default dialogo6;
