# Koristimo Node 20 Alpine
FROM node:20-alpine

# Postavimo radni folder
WORKDIR /app

# Kopiramo package.json i package-lock.json
COPY package*.json ./

# Instaliramo dependencies
RUN npm install --production

# Kopiramo ostatak projekta
COPY . .

# Expose port koji Fly dodeli
EXPOSE 3000

# Pokrenemo server
CMD ["node", "src/server.js"]
