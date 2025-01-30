const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const assert = require("assert");

let response;

Given("que não existe um usuário com o email {string}", async function (email) {
  try {
    const res = await axios.get("http://localhost:3000/users");

    if (res.status === 200) {
      const user = res.data.find((user) => user.email === email);

      if (user) {
        await axios.delete(`http://localhost:3000/users/${user._id}`);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Nenhum usuário encontrado, continuando...");
    } else {
      throw new Error("Erro ao verificar/excluir usuário: " + error.message);
    }
  }
});

When("eu faço uma requisição POST para {string} com os seguintes dados:", async function (url, dataTable) {
  const data = Object.fromEntries(dataTable.rawTable);

  try {
    response = await axios.post(`http://localhost:3000${url}`, data);
  } catch (error) {
    throw new Error("Erro ao fazer requisição POST: " + error.message);
  }
});

Then("a resposta deve conter o campo {string} com o valor {string}", function (field, value) {
  assert.strictEqual(response.data[field], value);
});
