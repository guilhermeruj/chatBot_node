module.exports = {
  execute: function (client, message) {
    client
      .sendText(
        message.from,
        "Desculpe, algo deu errado. Por favor, reinicie o processo.",
        { quotedMessage: message }
      )
      .then(() => {
        console.log("Message sent.");
      })
      .catch((error) => {
        console.error("Error when sending message", error);
      });
  },
};
