FROM node:21-bullseye-slim AS development

RUN apt update && apt install --yes --no-install-recommends curl default-jre

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3000

FROM node:21-alpine3.18 AS build

WORKDIR /app

COPY package.json ./

COPY --from=development /app/node_modules ./node_modules

COPY . .
RUN npm run build

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Remove the existing node_modules directory and only install production dependencies
RUN npm ci --only=production && npm cache clean --force

FROM node:21-alpine3.18 AS production

COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env.local ./.env.local
COPY --from=build /app/.env.production ./.env.production
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

CMD ["npm", "start"]