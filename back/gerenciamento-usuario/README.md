# Strapi application

Gerenciamento de contas baseado em strapi. 

## 0. Dependência NodeJS
O módulo Strapi com suporte estável ao MongoDB requer NodeJS em versão <=14.x.x, assim recomendo usar o NVM como gerenciador de versões NodeJS. 

Para instalar e usar a versão correta a partir do NVM:

    ```bash
    $ nvm install 14.0
    $ nvm use 14.0
    ```
## 1. Banco de dados
    As configurações para o banco de dados se encontram em:
    ```bash
    config/database.js
    ```
    As configurações atuais são referentes à uma instância no MongoDB Atlas, atualmente com acesso permitido de qualquer IP.

## 1. Para iniciar o desenvolvimento:

    ```bash
    $ npm install
    $ npm run develop
    $ npm start
    ```

## 2. Painel de admin
### 2.1 Painel de admin BD online padrão
Caso esteja usando a versão do MongoDB configurada aqui, já há um admin armazenado online, entre com as credenciais:
    ```bash
    admin@aglomerados.com
    ```
    ```bash
    aglomerarEmuit0
    ```
### 2.1 Painel de admin BD alternativo
Siga as etapas de criação do primeiro usuário em localhost:1337/admin

### 3.Rotas
O arquivo testes_rotas_insomnia contém as principais rotas e operações de interesse. Pode ser importado na ferramenta *Insomnia* e creio ser compativel com *Postman*. 
