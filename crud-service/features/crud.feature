Feature: Testando o microserviço CRUD

  Scenario: Criar um novo usuário
    Given que não existe um usuário com o email "teste@example.com"
    When eu faço uma requisição POST para "/users" com os seguintes dados:
      | key      | value              |
      | name     | Teste              |
      | email    | teste@example.com  |
      | password | 123456             |
    Then a resposta deve conter o campo "email" com o valor "teste@example.com"

  Scenario: Criar uma nova startup
    When eu faço uma requisição POST para "/startups" com os seguintes dados:
      | key         | value       |
      | name        | Startup X   |
      | industry    | Tech        |
      | founder     | John Doe    |
      | foundedDate | 2020-01-01  |
    Then a resposta deve conter o campo "name" com o valor "Startup X"
