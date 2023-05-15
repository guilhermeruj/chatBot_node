function dialogocl2(client, message) {
  client
    .sendText(
      message.from,
      "Descreva em pouca palavra o que precisa e aguarde alguns instante que o atendente era de responder.",
      { quotedMessage: message, waitForAck: true }
    )
    .then(() => {
      console.log("Message sent.");
    })
    .catch((error) => {
      console.error("Error when sending message", error);
    });
}

export default dialogocl2;
