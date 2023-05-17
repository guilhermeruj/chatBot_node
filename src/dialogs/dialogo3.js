function dialogo3(client, message) {
  client
    .sendbuttons(message.from, "Confira nossas promoções disponiveis:\n", {
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
