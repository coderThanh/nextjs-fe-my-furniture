FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NEXT_PUBLIC_HOST_API
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}
ARG NEXT_PUBLIC_HOST_PORT
ENV NEXT_PUBLIC_HOST_PORT=${NEXT_PUBLIC_HOST_PORT}
ARG NEXT_PUBLIC_HOST_IMG_API
ENV NEXT_PUBLIC_HOST_IMG_API=${NEXT_PUBLIC_HOST_IMG_API}
ARG NEXT_PUBLIC_HOST_IMG_PORT
ENV NEXT_PUBLIC_HOST_IMG_PORT=${NEXT_PUBLIC_HOST_IMG_PORT}

ARG NEXT_PUBLIC_API_TOKEN
ENV NEXT_PUBLIC_API_TOKEN=${NEXT_PUBLIC_API_TOKEN}

ARG NEXT_PUBLIC_HAS_API_DB_CONECT
ENV NEXT_PUBLIC_HAS_API_DB_CONECT=${NEXT_PUBLIC_HAS_API_DB_CONECT}

ARG NEXT_PUBLIC_IS_MAINTAIN_MODE
ENV NEXT_PUBLIC_IS_MAINTAIN_MODE=${NEXT_PUBLIC_IS_MAINTAIN_MODE}

ARG NEXT_PUBLIC_IS_HIDDEN_SEO
ENV NEXT_PUBLIC_IS_HIDDEN_SEO=${NEXT_PUBLIC_IS_HIDDEN_SEO}

ARG NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG=${NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG}
ARG NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG=${NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG}
ARG NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG=${NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG}

RUN yarn build

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1


# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_HOST_API
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}
ARG NEXT_PUBLIC_HOST_PORT
ENV NEXT_PUBLIC_HOST_PORT=${NEXT_PUBLIC_HOST_PORT}
ARG NEXT_PUBLIC_HOST_IMG_API
ENV NEXT_PUBLIC_HOST_IMG_API=${NEXT_PUBLIC_HOST_IMG_API}
ARG NEXT_PUBLIC_HOST_IMG_PORT
ENV NEXT_PUBLIC_HOST_IMG_PORT=${NEXT_PUBLIC_HOST_IMG_PORT}

ARG NEXT_PUBLIC_API_TOKEN
ENV NEXT_PUBLIC_API_TOKEN=${NEXT_PUBLIC_API_TOKEN}

ARG NEXT_PUBLIC_HAS_API_DB_CONECT
ENV NEXT_PUBLIC_HAS_API_DB_CONECT=${NEXT_PUBLIC_HAS_API_DB_CONECT}

ARG NEXT_PUBLIC_IS_MAINTAIN_MODE
ENV NEXT_PUBLIC_IS_MAINTAIN_MODE=${NEXT_PUBLIC_IS_MAINTAIN_MODE}

ARG NEXT_PUBLIC_IS_HIDDEN_SEO
ENV NEXT_PUBLIC_IS_HIDDEN_SEO=${NEXT_PUBLIC_IS_HIDDEN_SEO}

ARG NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG=${NEXT_PUBLIC_MENU_HEADER_BOTTOM_SLUG}
ARG NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG=${NEXT_PUBLIC_MENU_HEADER_MIDDLE_SLUG}
ARG NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG
ENV NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG=${NEXT_PUBLIC_MENU_HEADER_MOBILE_SLUG}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]