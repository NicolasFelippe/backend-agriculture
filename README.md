
## Configurar ambiente
1. Instalar node 18.17.1;
2. Executar npm install na pasta raiz do projeto para instalar as dependências;
3. Criar um arquivo .env igual ao exemplo (.env.example)
4. Instalar Docker;
5. Executar no cmd após instalar o Docker:
```shell
 docker compose -f postgres.yaml up
```
6. Acessar o banco via Dbaver (ou outro programa do seu gosto) e criar o banco 'produtores';
7. Executar o comando para criar as tabelas: 
```shell
npx prisma migrate dev
```
8. Executar o projeto: 
```shell
npm run dev
```


### Comandos prisma
1. Gerar schemas:
```shell
npx prisma generate
```
2. Gerar migration inicial:
```shell
npx prisma migrate dev --name init
```
3. Executar migration em ambiente DEV:
```shell
npx prisma migrate dev
```