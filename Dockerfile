FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build
CMD ["npm", "start"]
