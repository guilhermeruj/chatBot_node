import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import path from "path";
import dialogocl1 from "./dialogs/dialogocl1.js";
import dialogocl2 from "./dialogs/dialogocl2.js";
import dialogo1 from "./dialogs/dialogo1.js";
import dialogo2 from "./dialogs/dialogo2.js";
import dialogo3 from "./dialogs/dialogo3.js";
import dialogo4 from "./dialogs/dialogo4.js";
import dialogo5 from "./dialogs/dialogo5.js";
import dialogo6 from "./dialogs/dialogo6.js";
import dialogo7 from "./dialogs/dialogo7.js";

// Carregar os contatos do arquivo JSON
const contatos = JSON.parse(fs.readFileSync("contatos.json", "utf8")).contatos;

function start(client) {
  console.log("Cliente Venom iniciado!");
  const contatos = JSON.parse(
    fs.readFileSync("contatos.json", "utf8")
  ).contatos;
  let index = 0;
  const intervalId = setInterval(() => {
    const contato = contatos[index];

    if ("numero" in contato && isValidPhoneNumber(contato.numero.slice(-11))) {
      console.error(`Número de telefone inválido: ${contato.numero}`);
      index++;
      return;
    }
    const textmsg =
      "*Mais rapidez, menos stress*\n\nNão se estresse mais com a lentidão da sua internet!\nContrate agora a Click Telecom e tenha internet 100% fibra com 600Mega por apenas R$69,99/mês!\n\nDigite 'OK' e conheça a Click";

    const numero = contato.numero;

    client
      .sendText(`${numero}@c.us`, textmsg)
      .then((result) => {
        console.log(`Mensagem enviada para: ${numero}`);
      })
      .catch((error) => {
        console.error(`Erro ao enviar mensagem para: ${numero} - ${error}`);
      });

    index++;

    if (index === contatos.length) {
      clearInterval(intervalId);
      console.log("Todas as mensagens foram enviadas!");
    }
  }, 60000);

  // Aumentar o tempo limite de execução do script para 1 hora (3600000 milissegundos)
  setTimeout(() => {
    clearInterval(intervalId);
    console.log("Tempo limite de execução atingido.");
    client.close();
  }, 3600000);

  function isValidPhoneNumber(phoneNumber) {
    // Verificar se o número de telefone tem o formato correto
    const regex = /^55[0-9]{10}$/;
    return regex.test(phoneNumber);
  }

  // Inicio atendimento
  const atendimento = {};
  // função para salvar os dados
  function salvaContato(tempObj) {
    console.log("Início da função salvaContato");
    console.log("Objeto recebido:", tempObj);

    fs.readFile("atendimentos.json", "utf8", (err, data) => {
      if (err) {
        console.error("Erro ao ler o arquivo atendimentos.json", err);
        return;
      }
      console.log("Arquivo atendimentos.json lido com sucesso");
      const atendimentos = JSON.parse(data);

      atendimentos.push(tempObj);

      const json = JSON.stringify(atendimentos, null, 2);
      fs.writeFile("atendimentos.json", json, "utf8", (err) => {
        if (err) {
          console.error("Erro ao escrever o arquivo atendimentos.json", err);
          return;
        }
        console.log("Arquivo atendimentos.json salvo com sucesso");
      });
    });
  }

  client.onMessage((message) => {

    console.log(message);
 
    if (!message.isGroupMsg) {
      const tel = message.from;
      if (!atendimento[tel]) {

        console.log("Creating new atendimento entry");

        let stage = 1;

        atendimento[tel] = {
          tel: tel,
          cliente: null,
          cidade: null,
          cep: null,
          tipo: null,
          end: null,
          complemento: null,
          referencia: null,
          stage: stage,
        };
        console.log("New atendimento entry created:", atendimento[tel]);
      }

      if (message.body && atendimento[tel].stage === 1) {
        dialogo1(client, message);
        atendimento[tel].stage = 2;
      } 
      else if (message.body === "SIM" && atendimento[tel].stage === 2) {
        dialogocl1(client, message);
      } 
      else if (
        message.body === "Falar com atendente" &&
        atendimento[tel].stage === 2
      ) {
        dialogocl2(client, message);
        atendimento[tel].stage = 12;
      } 
      else if (
        message.body === "NÃO" ||
        (message.body === "Contratar novo pacote" &&
          atendimento[tel].stage === 2)
      ) {
        //Pergunta cidade
        dialogo2(client, message, atendimento);
        atendimento.cliente = message.body;
        atendimento[tel].stage = 3;
      } 
      else if (
        //Pergunta cep
        (message.body === "Uberlândia" && atendimento[tel].stage === 3) ||
        (message.body === "Uberaba" && atendimento[tel].stage === 3)
      ) {
        atendimento.cidade = message.body;
        dialogo3(client, message, atendimento);
        atendimento[tel].stage = 4;
      } 
      else if (/^\d{8}$/.test(message.body) && atendimento[tel].stage === 4) {
        //Pergunta tipo de residencia
        atendimento.cep = message.body;
        dialogo4(client, message, atendimento);
        atendimento[tel].stage = 5;
      } 
      else if (
        //pergunta endereço
        message.body === "CASA" ||
        message.body === "PRÉDIO" ||
        (message.body === "CONDOMÍNIO" && atendimento[tel].stage === 5)
      ) {
        dialogo5(client, message, atendimento);
        atendimento.tipo = message.body;
        atendimento[tel].stage = 6;
      } 
      else if (message.body && atendimento[tel].stage === 6) {
        //Pergunta complemento
        dialogo6(client, message, atendimento);
        atendimento.end = message.body;
        atendimento[tel].stage = 7;
      } else if (message.body && atendimento[tel].stage === 7) {
        //Pergunta referencia
        atendimento.complemento = message.body;
        dialogo7(client, message, atendimento);
        atendimento[tel].stage = 8;
        console.log(atendimento[tel].stage);
      } else if (message.body && atendimento[tel].stage === 8) {
        //Confirma endereço
        atendimento.referencia = message.body;

        const cep = atendimento.cep;
        const cidade = atendimento.cidade;
        const end = atendimento.end;
        const complemento = atendimento.complemento;
        const referencia = atendimento.referencia;

        // Envia a mensagem de texto primeiro
        const textomensagem = `Agora é só confirma os dados informados:\n\nEndereço: ${end}\nCidade: ${cidade}\nCep: ${cep}\n Complemento: ${complemento}\n Referência: ${referencia}`;
        client
          .sendText(message.from, textomensagem)
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
              .sendButtons(
                message.from,
                menu.header,
                menu.buttons,
                menu.subtitle
              )
              .then(() => {
                console.log("Buttons sent.");
              })
              .catch((error) =>
                console.error("Error when sending buttons", error)
              );
          })
          .catch((error) => console.error("Error when sending message", error));

        atendimento[tel].stage = 9;
      } else if (message.body && atendimento[tel].stage === 9) {
        //confirma e envia para o atendente ou resenta o estagio
        if (message.body === "SIM") {
          atendimento[tel].stage = 11;
          // Crie um objeto temporário contendo apenas as propriedades que têm valores

          const tempObj = {
            tel: message.from,
            cliente: atendimento.cliente,
            cidade: atendimento.cidade,
            cep: atendimento.cep,
            tipo: atendimento.tipo,
            end: atendimento.end,
            complemento: atendimento.complemento,
            referencia: atendimento.referencia,
            stage: atendimento.stage,
          };
          salvaContato(tempObj); // Passe o objeto temporário para a função salvaContato
          client
            .sendText(
              message.from,
              "Perfeito, agora é só aguardar alguns instantes que o atendente já confima a disponibilidade e finaliza o seu atendimento.",
              { quotedMessage: message, waitForAck: true }
            )
            .then(() => {
              console.log("Message sent.");
            })
            .catch((error) => {
              console.error("Error when sending message", error);
            });
          atendimento[tel].stage = 9;
        } else if (message.body === "NÃO") {
          const menu = {
            header: "Qual parte ficou errada?",
            subtitle: "Por favor, escolha uma das opções abaixo:",
            buttons: [
              { id: "Cidade", text: "Cidade" },
              { id: "Cep", text: "cep" },
              { id: "Tipo", text: "Tipo de residência" },
              { id: "End", text: "Endereço" },
            ],
          };
          client
            .sendButtons(message.from, menu.header, menu.buttons, menu.subtitle)
            .then(() => {
              console.log("Buttons sent.");
            })
            .catch((error) =>
              console.error("Error when sending buttons", error)
            );
        }
        atendimento[tel].stage = 10;
      } else if (message.body && atendimento[tel].stage === 10) {
        if (message.body === "Cidade") {
          dialogo2(client, message, atendimento);
          atendimento[tel].stage = 3;
        } else if (message.body === "cep") {
          dialogo3(client, message, atendimento);
          atendimento[tel].stage = 4;
        } else if (message.body === "Tipo de residência") {
          dialogo4(client, message, atendimento);
          atendimento[tel].stage = 5;
        } else {
          console.log("Resposta do cliente:", atendimento);
          atendimento[tel].stage = 6;
        }
      } else if (message.body && atendimento[tel].stage === 12) {
        // atendente
        client
          .sendText(
            message.from,
            "O seu atendimento esta na fila, em alguns instante será respondido.",
            { quotedMessage: message, waitForAck: true }
          )
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });
      } else {
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
      }
    }
  });
}

create()
  .then((client) => start(client))
  .catch((error) => {
    console.log(error);
  });
