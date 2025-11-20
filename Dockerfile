# 1단계: Next.js 빌드
FROM node:24-alpine AS build

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json ./
RUN npm install

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 프로덕션 실행 환경
FROM node:24-alpine

WORKDIR /app

# 빌드 결과 및 필요한 파일 복사
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Next.js 기본 포트 (3000)
EXPOSE 3000

# Next.js 애플리케이션 실행
CMD ["npm", "run", "start"]