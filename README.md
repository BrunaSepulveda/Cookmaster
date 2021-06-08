### Projeto Avaliativo desenvolvido pela Trybe
---
# Habilidades

Neste projeto, você será capaz de:

- Entender o que há por dentro de um token de autenticação;

- Gerar tokens a partir de informações como login e senha;

- Autenticar rotas do Express, usando o token JWT;

- Fazer upload de arquivos em APIs REST;

- Salvar arquivos no servidor através de uma API REST;

- Consultar arquivos do servidor através de uma api REST.

---

## Desenvolvimento

Você vai desenvolver todas as camadas da aplicação (Models, Service e Controllers) a partir do seu código no projeto cookmaster.

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, pros mais íntimos 😜).

Para realizar qualquer tipo de alteração no banco de dados (como cadastro, edição ou exclusão de receitas) será necessário autenticar-se. Além disso, as pessoas usuárias devem poder ser clientes ou administradores. Os clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já um administrador pode disparar qualquer ação em qualquer receita.

A autenticação deverá ser feita via `JWT`.

O código para cadastro de pessoas usuárias deve ser criado por você utilizando os conhecimentos adquiridos nesse bloco.

Deverá ser possível adicionar uma imagem à uma receita, utilizando o upload de arquivos fornecido pelo `multer`.

# Requisitos do projeto

## Requisitos Obrigatórios

### 1 - Crie um endpoint para o cadastro de usuários

- A rota deve ser (`/users`).

- No banco um usuário precisa ter os campos Email, Senha, Nome e Role.

- Para criar um usuário através da API, todos os campos são obrigatórios, com exceção do Role.

- O campo Email deve ser único.

- Usuários criados através desse endpoint devem ter seu campo Role com o atributo _user_, ou seja, devem ser usuários comuns, e não admins.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o campo "name" é obrigatório]**

Se o usuário não tiver o campo "name" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Usuário sem Nome](./public/usuariosemnome.png)

- **[Será validado que o campo "email" é obrigatório]**

Se o usuário não tiver o campo "email" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Usuário sem Email](./public/usuariosememail.png)

- **[Será validado que não é possível cadastrar usuário com o campo email inválido]**

Se o usuário tiver o campo email inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Email Inválido](./public/campoemailinvalido.png)

- **[Será validado que o campo "senha" é obrigatório]**

Se o usuário não tiver o campo "senha" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Usuário sem Senha](./public/usuariosemsenha.png)

- **[Será validado que o campo "email" é único]**

Se o usuário cadastrar o campo "email" com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:

![Email já Usado](./public/emailjausado.png)

- **[Será validado que é possível cadastrar usuário com sucesso]**

Se o usuário for cadastrado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:

![Usuário Cadastrado](./public/usuariocriadocomsucesso.png)

- **[Será validado que é possível ao cadastrar usuário, o valor do campo "role" tenha o valor "user"]**

Se o usuário for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:

![Campo Role](./public/validarrole.png)

### 2 - Crie um endpoint para o login de usuários

- A rota deve ser (`/login`).

- A rota deve receber os campos Email e Senha e esses campos devem ser validados no banco de dados.

- Na configuração do `JWT` não use variáveis de ambientes para não ter conflito com o avaliador.

- Um token `JWT` deve ser gerado e retornado caso haja sucesso no login. No seu payload deve estar presente o id, email e role do usuário.

- O body da requisição deve conter o seguinte formato:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o campo "email" é obrigatório]**

Se o login não tiver o campo "email" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

![Usuário sem Senha](./public/loginsememail.png)

- **[Será validado que o campo "password" é obrigatório]**

Se o login não tiver o campo "password" o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

![Usuário sem Senha](./public/loginsemsenha.png)

- **[Será validado que não é possível fazer login com um email inválido]**

Se o login tiver o email inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

![Email Inválido](./public/loginemailinvalido.png)

- **[Será validado que não é possível fazer login com uma senha inválida]**

Se o login tiver a senha inválida o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

![Senha Inválida](./public/loginsenhainvalida.png)

- **[Será validado que é possível fazer login com sucesso]**

Se foi feito login com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:

![Login com Sucesso](./public/logincomsucesso.png)

### 3 - Crie um endpoint para o cadastro de receitas

- A rota deve ser (`/recipes`).

- A receita só pode ser criada caso o usuário esteja logado e o token `JWT` validado.

- No banco, a receita deve ter os campos Nome, Ingredientes, Modo de preparo, URL da imagem e Id do Autor.

- Nome, ingredientes e modo de preparo devem ser recebidos no corpo da requisição, com o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

- O campo dos ingredientes pode ser um campo de texto aberto.

- O campo ID do autor, deve ser preenchido automaticamente com o ID do usuário logado, que deve ser extraído do token JWT.

- A URL da imagem será preenchida através de outro endpoint

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível cadastrar receita sem o campo "name"]**

Se a receita não tiver o campo "name" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Receita sem nome](./public/receitasemnome.png)

- **[Será validado que não é possível cadastrar receita sem o campo "ingredients"]**

Se a receita não tiver o campo "ingredients" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Receita sem ingrediente](./public/receitasemingrediente.png)

- **[Será validado que não é possível cadastrar receita sem o campo "preparation"]**

Se a receita não tiver o campo "preparation" o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

![Receita sem preparo](./public/receitasempreparo.png)

- **[Será validado que não é possível cadastrar uma receita com token invalido]**

Se a receita não tiver o token válido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:

![Receita com token inválido](./public/tokeninvalidoreq3.png)

- **[Será validado que é possível cadastrar uma receita com sucesso]**

O resultado retornado para cadastrar a receita com sucesso deverá ser conforme exibido abaixo, com um status http `201`:

![Receita com Sucesso](./public/receitacomsucesso.png)

### 4 - Crie um endpoint para a listagem de receitas

- A rota deve ser (`/recipes`).

- A rota pode ser acessada por usuários logados ou não

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que é possível listar todas as receitas sem estar autenticado]**

O resultado retornado para listar receitas com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Receita com Sucesso](./public/listarreceitas.png)

- **[Será validado que é possível listar todas as receitas estando autenticado]**

O resultado retornado para listar receitas com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Receita com Sucesso](./public/listarreceitas.png)

### 5 - Crie um endpoint para visualizar uma receita específica

- A rota deve ser (`/recipes/:id`).

- A rota pode ser acessada por usuários logados ou não

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que é possível listar uma receita específica sem estar autenticado]**

O resultado retornado para listar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Listar uma Receita](./public/listarumareceita.png)

- **[Será validado que é possível listar uma receita específica estando autenticado]**

O resultado retornado para listar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Listar uma Receita](./public/listarumareceita.png)

- **[Será validado que não é possível listar uma receita que não existe]**

O resultado retornado para listar uma receita que não existe deverá ser conforme exibido abaixo, com um status http `404`:

![Listar uma Receita inexistente](./public/receitanaoencontrada.png)

### 6 - Permissões do usuário admin

Crie um arquivo `seed.js` na raiz do projeto com uma query do Mongo DB capaz de inserir um usuário na coleção _users_ com os seguintes valores:

`{ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' }`

**Obs.:** Esse usuário tem o poder de criar, deletar, atualizar ou remover qualquer receita, independente de quem a cadastrou. Isso será solicitado ao longo dos próximos requisitos.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que o projeto tem um arquivo de seed, com um comando para inserir um usuário root e verifico que é possivel fazer login]**    

Será validado no arquivo `seed.js` existe a query para criar um usuário root

### 7 - Crie um endpoint para a edição de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser atualizada caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser atualizada caso pertença ao usuário logado, ou caso esse usuário seja um admin.

- O corpo da requisição deve receber o seguinte formato:

  ```json
  {
    "name": "string",
    "ingredients": "string",
    "preparation": "string"
  }
  ```

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível editar receita sem estar autenticado]**

O resultado retornado para editar receita sem autenticação deverá ser conforme exibido abaixo, com um status http `401`:

![Editar uma Receita sem autenticação](./public/editarsemautenticacao.png)

- **[Será validado que não é possível editar receita com token inválido]**

O resultado retornado para editar receita com token inválido deverá ser conforme exibido abaixo, com um status http `401`:

![Editar uma Receita com token inválido](./public/editartokeninvalido.png)

- **[Será validado que é possível editar receita estando autenticado]**

O resultado retornado para editar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Editar uma Receita](./public/editarcomsucesso.png)

- **[Será validado que é possível editar receita com usuário admin]**

O resultado retornado para editar uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `200`:

![Editar uma Receita](./public/editarcomsucesso.png)

### 8 - Crie um endpoint para a exclusão de uma receita

- A rota deve ser (`/recipes/:id`).

- A receita só pode ser excluída caso o usuário esteja logado e o token `JWT` validado.

- A receita só pode ser excluída caso pertença ao usuário logado, ou caso o usuário logado seja um admin.

**Além disso, as seguintes verificações serão feitas:**

- **[Será validado que não é possível excluir receita sem estar autenticado]**

O resultado retornado para excluir uma receita sem autenticação deverá ser conforme exibido abaixo, com um status http `401`:

![Excluir uma Receita sem autenticação](./public/excluirsemautenticacao.png)

- **[Será validado que é possível excluir receita estando autenticado]**

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`:

![Excluir uma Receita](./public/excluircomsucesso.png)

- **[Será validado que é possível excluir receita com usuário admin]**

O resultado retornado para excluir uma receita com sucesso deverá ser conforme exibido abaixo, com um status http `204`:

![Excluir uma Receita](./public/excluircomsucesso.png)
