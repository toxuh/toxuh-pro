FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache libc6-compat
RUN corepack enable

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN find /app -type d -name "@eaDir" -prune -exec rm -rf {} + || true

ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

RUN npm run build

RUN addgroup -S app && adduser -S -G app app
USER app

EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

CMD ["npm", "run", "start"]
