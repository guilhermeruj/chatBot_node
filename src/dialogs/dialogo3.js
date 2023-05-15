function dialogo3(client, message) {
  client
    .sendText(message.from, "Digite seu CEP (Exemplo: 12345678):", {
      quotedMessage: message,
    })
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Error when sending message", error);
    });
}
export default dialogo3;
