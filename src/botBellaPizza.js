import { create, Whatsapp } from "venom-bot";
import fs from "fs";
import dialogocl2 from "./dialogs/dialogocl2.js";
import dialogo1 from "./dialogs/dialogo1.js";
import dialogo2 from "./dialogs/dialogo2.js";
import dialogo3 from "./dialogs/dialogo3.js";
import dialogo4 from "./dialogs/dialogo4.js";
import dialogo5 from "./dialogs/dialogo5.js";
import dialogo6 from "./dialogs/dialogo6.js";
import dialogoencerra from "./dialogs/dialogoencerra.js";
import buscarPizza from "./dialogs/buscarPizza.js";
import dialogoPedaco from "./dialogs/dialogoPedaco.js";
import dialogoendereco from "./dialogs/dialogoendereco.js";
import { parse } from "path";

const promo = fs.readFileSync("./imagens/promo.PNG");

function start(client) {
  console.log("Cliente Venom iniciado!");

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
    // Se não é de grupo(false) executa o codigo:
    if (message.isGroupMsg === false) {
      // Monta a constante para o objeto
      const tel = message.from;

      if (!atendimento[tel]) {
        console.log("Creating new atendimento entry");

        let stage = 1;

        atendimento[tel] = {
          tel: tel,
          cliente: null,
          numeroPizza: [],
          end: null,
          valor: [],
          stage: stage,
          id: null, // Define em qual Else if o cliente esta. Controla a msg
        };
        console.log("New atendimento entry created:", atendimento[tel]);
      }
      //  ---------- Inicio da conversa
      if (message.body && atendimento[tel].stage === 1) {
        dialogo1(client, message);
        atendimento[tel].stage = 2;
      }
      //  -------------------- Envia cardapio
      else if (message.body === "1" && atendimento[tel].stage === 2) {
        dialogo2(client, message);
      }
      //  -------------------- Envia as promoções
      else if (message.body === "2" && atendimento[tel].stage === 2) {
        client
          .sendImage(
            message.from,
            "./imagens/promo.png",
            "image-name",
            "Promoção da semana"
          )
          .then((result) => {
            console.log("Result: ", result); //return object success
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
          });
      }
      //  -------------------- Faz o pedido
      else if (message.body === "3" && atendimento[tel].stage === 2) {
        dialogo3(client, message);
        atendimento[tel].stage = 3;
      }

      //  -------------------- Faz abertura para atendimento
      else if (message.body === "4" && atendimento[tel].stage === 2) {
        dialogocl2(client, message);
      } else if (message.body && atendimento[tel].stage === 3) {
        atendimento.cliente = message.body;
        dialogo4(client, message);
        atendimento[tel].stage = 4;
      } else if (message.body && atendimento[tel].stage === 4) {
        // Recebe numero da pizza e envia dialogo de endereço
        const id = parseInt(message.body);
        atendimento[tel].id = id;
        const pizza = buscarPizza(id);
        atendimento[tel].numeroPizza.push(pizza.name);
        const nomePizza = atendimento[tel].numeroPizza;
        //pergunta quantos pedaços
        dialogoPedaco(client, message, nomePizza);
        atendimento[tel].stage = 5;
      } else if (message.body && atendimento[tel].stage === 5) {
        const pedacos = message.body;
        // verifica qual o pedaço
        if (pedacos === "4") {
          const id = atendimento[tel].id;
          const pizza = buscarPizza(id);
          atendimento[tel].valor.push(pizza.pedacos4);
          console.log(atendimento[tel]);
          dialogo5(client, message, atendimento[tel].numeroPizza);
          atendimento[tel].stage = 6;
        } else {
          const id = atendimento[tel].id;
          const pizza = buscarPizza(id);
          atendimento[tel].valor.push(pizza.pedacos8);
          console.log(atendimento[tel]);
          dialogo5(client, message, atendimento[tel].numeroPizza);
          atendimento[tel].stage = 6;
        }
      } else if (message.body === "1" && atendimento[tel].stage === 6) {
        dialogo4(client, message);
        atendimento[tel].stage = 4;
      } else if (message.body === "2" && atendimento[tel].stage === 6) {
        dialogoendereco(client, message);
        atendimento[tel].stage = 30;
      }
      // ----------Encerra atendimento
      else if (message.body === "5" && atendimento[tel].stage === 2) {
        atendimento.end = message.body;
        //encerra o atendimento
        dialogoencerra(client, message);
        atendimento[tel].stage = 16;
      }
      // Salvar dados em json
      else if (message.body === "1" && atendimento[tel].stage === 12) {
        atendimento[tel].stage = 18;
        // Crie um objeto temporário contendo apenas as propriedades que têm valores
        const tempObj = {
          tel: message.from,
          cliente: atendimento.cliente,
          numeroPizza: atendimento[tel].numeroPizza,
          end: atendimento.end,
          stage: atendimento[tel].stage,
        };

        salvaContato(tempObj); // Passe o objeto temporário para a função salvaContato
        client
          .sendText(
            message.from,
            `Seu pedido já está sendo preparado, tempo de entrega no máximo 60 minutos. Agradecemos pela preferência🍕 Bom Apetite!!!`,
            { waitForAck: true }
          )
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });
        atendimento[tel].stage = 31;
      } else if (message.body && atendimento[tel].stage === 30) {
        atendimento.end = message.body;

        const cliente = atendimento.cliente;
        const numeroPizza = atendimento[tel].numeroPizza.join(", ");
        console.log(numeroPizza);
        const end = atendimento.end;

        const valores = atendimento[tel].valor;
        let total = 0;

        for (let i = 0; i < valores.length; i++) {
          const valor = parseFloat(valores[i].replace(",", "."));
          total += valor;
        }

        // Envia a mensagem de texto primeiro

        const textomensagem = `Agora *${cliente}* confirme o seu pedido:\n\nNumero da Pizza: ${numeroPizza}\nEndereço: ${end}\n*Total: R$ ${total}*\n\n1 - Esta correto\n2 - Ficou errado`;
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Erro ao enviar a mensagem.", error);
          });
        atendimento[tel].stage = 12;
      } // ------------------ Ajustes do pedido -----------------
      else if (message.body === "2" && atendimento[tel].stage === 12) {
        // Pergunta o que esta errado
        const textomensagem =
          "Me informe por favor o que ficou errado\n\n 7 - nome \n 8 - numero da pizza\n 9 - Endereço";
        client
          .sendText(message.from, textomensagem)
          .then(() => {
            console.log("Message sent.");
          })
          .catch((error) => {
            console.error("Error when sending message", error);
          });
        atendimento[tel].stage = 10;
      } else if (message.body === "7" && atendimento[tel].stage === 10) {
        // chama função de preenchimento do nome
        dialogo3(client, message);
        atendimento[tel].stage = 11;
      } else if (message.body === "8" && atendimento[tel].stage === 10) {
        // Altera Pedido numero da Pizza
        atendimento.numeroPizza = [];
        atendimento[tel].valor = [];
        dialogo4(client, message);
        atendimento[tel].stage = 4;
        //Altera o cep
      } else if (message.body === "9" && atendimento[tel].stage === 10) {
        dialogo5(client, message);
        atendimento[tel].stage = 5;
      } //------------------- Final do ajuste ---------------
      // Caso algo de errado
      else {
        atendimento[tel].stage = 1;
        const texto =
          "Vamos reiniciar o seu atendimento, Por favor digite 'OK'";
        client
          .sendText(message.from, texto)
          .then(() => {
            console.log("Mensagem enviada.");
          })
          .catch((error) => {
            console.error("Erro ao enviar mensagem", error);
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
