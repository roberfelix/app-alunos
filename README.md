# 🚀 Configuração do Projeto com Docker

## 📌 Vídeo Tutorial
Assista ao vídeo explicando a configuração do ambiente:
[[Video do trabalho]](https://www.loom.com/share/eae599fe4a2e4e00a6c4a6d03585a1c1?sid=0d94383e-293c-4010-9929-c9a6020fb834)

## 🛠️ Containers Necessários
Para rodar o projeto corretamente, você precisará executar manualmente os seguintes containers Docker:

### 📦 Banco de Dados PostgreSQL
```bash
docker run -d --name kong-database -p 5432:5432 postgres:14
```

### 📦 MongoDB
```bash
docker run -d --name mongodb -p 27017:27017 mongo:4.4
```

### 📦 Kong API Gateway
```bash
docker run -d --name kong kong:latest
```

### 📦 Konga (Interface para Kong)
```bash
docker run -d --name konga pantsel/konga:latest
```

## ❌ Problema com `docker-compose.yml`
Inicialmente, tentamos utilizar um arquivo `docker-compose.yml` para gerenciar os containers, porém encontramos diversos problemas de compatibilidade e configuração.

Por isso, decidimos rodar os containers manualmente para garantir que tudo funcione corretamente.

Se precisar de ajuda, entre em contato! 🚀

