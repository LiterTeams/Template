# Этап 1: Установка зависимостей
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --only=production && yarn cache clean

# Этап 2: Билд проекта
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn prisma generate
RUN yarn add typescript --dev
RUN yarn build

# Этап 3: Финальный контейнер для продакшн-режима
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

CMD ["yarn", "start:prod"]