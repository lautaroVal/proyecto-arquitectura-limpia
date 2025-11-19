FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY domain/package*.json ./domain/
COPY apps/backend/package*.json ./apps/backend/

RUN npm install --prefix ./domain
RUN npm install --prefix ./apps/backend

COPY ./ ./

RUN npx prisma generate --schema=./apps/backend/prisma/schema.prisma

RUN npx tsc --project ./domain/tsconfig.json
RUN npx tsc --project ./apps/backend/tsconfig.json

EXPOSE 3000

CMD ["node", "./apps/backend/dist/index.js"]