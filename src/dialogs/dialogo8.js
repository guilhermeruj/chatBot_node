function dialogo8(client, message) {
  const cep = atendimento.cep;
  const cidade = atendimento.cidade;
  const end = atendimento.end;
  const complemento = atendimento.complemento;
  const referencia = atendimento.referencia;

  // Envia a mensagem de texto primeiro
  const textomensagem = `Agora é só confirma o dados infromado:\n\nEndereço: ${end}\ncidade: ${cidade}\nCep: ${cep}\n Complemento: ${complemento}\n Referência: ${referencia}`
  client
    .sendText(message.from, messageText)
    .then(() => {
      console.log("Message sent.");
      // Depois envia os botões
      const menu = {
        header: "Esta tudo certo?",
        subtitle: "Por favor, escolha uma das opções abaixo:",
        buttons: [
          { id: "sim", text: "SIM" },
          { id: "nao", text: "NÃO" },
        ],
      };
      client
        .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
        .then(() => {
          console.log("Buttons sent.");
        })
        .catch((error) => console.error("Error when sending buttons", error));
    })
    .catch((error) => console.error("Error when sending message", error));
}

export default dialogo8;
