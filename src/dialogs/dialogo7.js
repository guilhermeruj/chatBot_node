function dialogo7(client, message) {
  client
    .sendText(
      message.from,
      "Tem algum *referencia*? (Digite 'Não' caso não tenha)",
      { quotedMessage: message }
    )
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Error when sending message", error);
    });
}
export default dialogo7;
