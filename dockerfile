# 1. Escolhe uma imagem leve e estável do Node.js baseada em Linux Alpine
FROM node:18-alpine

# 2. Instala dependências nativas necessárias para compilar o SQLite no Linux, se preciso
RUN apk add --no-cache python3 make g++

# 3. Cria e define a pasta interna onde o projeto vai rodar dentro do container
WORKDIR /usr/src/app

# 4. Copia os arquivos de configuração de dependências
COPY package*.json ./

# 5. Instala as dependências listadas no package.json
RUN npm install

# 6. Copia TODO o restante dos arquivos do projeto (incluindo o biblioteca.db)
COPY . .

# 7. Avisa ao container que a aplicação vai escutar em uma porta (ajuste se usarem outra que não a 3000)
EXPOSE 3000

# 8. Comando para iniciar o servidor usando diretamente o arquivo principal de vocês
CMD ["node", "server.js"]