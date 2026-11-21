FROM node:26-alpine AS builder

WORKDIR /app

ARG BLOG_ENABLED=false
ARG DEPLOYMENT_URL="https://raawer.github.io"
ARG BASE_URL="/my-dso-blog/"
ARG DEPLOYMENT_BRANCH="main"
ARG GITHUB_ORG="raawer"
ARG GITHUB_PROJECT="my-dso-blog"

COPY . .

RUN npm ci && npm run build

FROM nginx:1.30-alpine AS runner

COPY --from=builder /app/build /usr/share/nginx/html
