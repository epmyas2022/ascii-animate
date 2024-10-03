FROM node:alpine3.20 as dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install


FROM node:alpine3.20 as production

WORKDIR /app

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0

CMD ["npm", "start"]

FROM node:alpine3.20 as development

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

ENV NODE_ENV=development
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]

