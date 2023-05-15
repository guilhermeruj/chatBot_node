module.exports = {
  execute: function (client, message) {
    client
      .sendText(
        message.from,
        "Certinho! Em alguns instantes um atendente irá entrar em contato com você para informar sobre a disponibilidade e data de instalação. Obrigado por escolher a Click Telecom!",
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