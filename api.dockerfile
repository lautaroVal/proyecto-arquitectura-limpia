FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY domain/package*.json ./domain/

RUN npm install

COPY ./ ./

WORKDIR /app/apps/backend
RUN npx prisma generate

WORKDIR /app
RUN npm run build --prefix domain

RUN npm run build --prefix apps/backend

FROM node:24-alpine
WORKDIR /app

COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

COPY --from=builder /app/domain/dist ./domain/dist

COPY --from=builder /app/domain/node_modules ./domain/node_modules

EXPOSE 3000
CMD ["node", "apps/backend/dist/index.js"]
