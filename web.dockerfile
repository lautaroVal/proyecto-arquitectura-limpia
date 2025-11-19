FROM node:24-alpine

WORKDIR /app

COPY apps/frontend/package*.json ./apps/frontend/

RUN npm install --prefix ./apps/frontend

COPY apps/frontend ./apps/frontend

EXPOSE 5173

CMD ["npm", "run", "dev", "--prefix", "./apps/frontend", "--", "--host", "0.0.0.0", "--port", "5173"]