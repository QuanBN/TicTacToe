FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:22-alpine3.19 AS runner
WORKDIR /app
COPY . .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm","start"]