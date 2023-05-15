function dialogo5(client, message) {
    client
      .sendText(
        message.from,
        "Qual o endereço, bairro, numero e rua? (Número da casa, bloco, quarteirão, exemplo 3d - andar 4°)",
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
