# Container pour créer le dosssier dist
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --mode production

# Container qui sert de vrai serveur (récupère le contenu du 1er)
FROM nginx:1.31-alpine
COPY --from=build /app/dist/loc_mns_front/browser /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf