# Desafio Nave

## Exercícios de Lógica

A resolução dos exercícios de lógica pode ser encontrada no [CodeSandbox](https://codesandbox.io/s/teste-estagio-template-forked-l3fvs).

## Desafio de back-end

O Desafio de back-end consiste em uma API desenvolvida em node.js com express, conectada a um banco de dados PostgreSQL através do knex. Essa aplicação segue os princípios do padrão MVC. O sistema foi desenvolvido em um container Docker e integrado ao banco de dados com docker-compose.

### Instruções

Para executar esse container, é necessário possuir git, Docker, e docker-compose instalados.

Primeiro você deve clonar o repositório para sua máquina com git.

```bash
$ git clone https://github.com/arthurcerveira/Desafio-Nave.git
```

Então será necessário criar os containers e executá-los com docker-compose.

```bash
$ cd Desafio-Nave
$ docker-compose build
$ docker-compose up -d
```

A API agora estará sendo executada no endereço `localhost:5000/`.

Para interromper a execução dos containers, basta executar o comando:

```bash
$ docker-compose down
```

### Endpoints

A documentação completa da API está disponível no [Postman](https://documenter.getpostman.com/view/8909195/Tz5ndeX3).

**Navers**

```
GET localhost:5000/naver
```

Retorna todos os Navers.

```
GET localhost:5000/naver/:id
```

Recebe o ID do Naver como parâmetro e retorna seus dados e os projetos que faz parte.

```
POST localhost:5000/naver/
```

Cria um novo Naver informando seus dados e os projetos que participa.

Exemplo de body da requisição:

```json
{
  "name": "Fulano",
  "birthdate": "1998-06-12",
  "admission_date": "2020-06-12",
  "job_role": "Desenvolvedor",
  "projects": [3]
}
```

**Projetos**

```
GET localhost:5000/project
```

Retorna todos os projetos.

```
GET localhost:5000/naver/:id
```

Recebe o ID do projeto como parâmetro e retorna seus dados e os Navers que participam.

```
POST localhost:5000/naver/
```

Cria um novo projeto informando seus dados e os Navers que participam.

Exemplo de body da requisição:

```json
{
  "name": "Projeto Bom",
  "navers": [1]
}
```

## Exercício de Banco de Dados

A resolução dos exercícios de Banco de Dados podem ser encontradas no diretório `EB` na raiz do repositório.

Para testar os scripts no PostgreSQL, basta iniciar o container com docker-compose.

```bash
$ cd EB/
$ docker-compose up -d
```

Então deve-se acessar o container e executar os scripts.

```bash
$ docker-compose exec db psql --username=nave --dbname=ebs
psql (13.1)
Type "help" for help.

ebs=$ \i EB/EB1.sql
ebs=$ \i EB/EB2.sql
ebs=$ \i EB/EB3.sql
ebs=$ \i EB/EB4.sql
ebs=$ \i EB/EB5.sql
```

## Desafio de front-end

Desafio de front-end consiste em uma interface apresentando dados de uma API. Essa interface pode ser acessada pelo [Github Pages](https://arthurcerveira.github.io/Desafio-Nave/).
