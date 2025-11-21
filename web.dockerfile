FROM node:24-alpine AS builder
WORKDIR /app

COPY domain/package*.json ./domain/
RUN npm install --prefix ./domain

COPY domain ./domain
COPY tsconfig.json ./tsconfig.json

RUN npm run build --prefix ./domain

COPY apps/frontend/package*.json ./apps/frontend/
RUN npm install --prefix ./apps/frontend

COPY apps/frontend ./apps/frontend

RUN npm run build --prefix ./apps/frontend

FROM nginx:alpine
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
