function dialogo5(client, message) {
    client
      .sendText(
        message.from,
        "Por favor digite o numero da pizza desejada, logo apos o seu nome e endereço de residencia",
        { quotedMessage: message }
      )
      .then(() => {
        console.log("Message sent.");
      })
      .catch((error) => {
        console.error("Error when sending message", error);
      });
  }
export default dialogo5;
