module.exports = {
  execute: function (client, message) {
    const options = {
      header: "Está tudo certinho?",
      content: "Tipo Local: " + global.localType +
               "\nCep: " + global.zipCode +
               "\nCidade: " + global.city +
               "\nRua: " + global.streetNumber +
               "\nComplemento: " + global.complement +
               "\nReferência: " + global.reference +
               "\n\nPor favor, confirme se as informações estão corretas.",
      footer: "1 - SIM\n2 - NÃO"
    };
    
    client.sendButtons(
      message.from,
      options.content,
      [
        { id: "1", text: "SIM" },
        { id: "2", text: "NÃO" }
      ],
      options.header
    ).then(() => {
      console.log("Buttons sent.");
    }).catch((error) => {
      console.error("Error when sending buttons", error);
    });
  }
};
