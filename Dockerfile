FROM oven/bun:1.2.14-alpine@sha256:b5d37e653d1b86f23c15ecac4f3f9b4a5572045f16258637e033a2b16b317926 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1.2.14-alpine@sha256:b5d37e653d1b86f23c15ecac4f3f9b4a5572045f16258637e033a2b16b317926 AS runtime

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 4321

CMD ["bun", "preview", "--", "--host", "0.0.0.0"]