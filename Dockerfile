# Build Backend
FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /app
RUN apk add --no-cache maven

COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

COPY backend/src ./src
RUN mvn package -DskipTests

# Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
RUN npm install -g pnpm
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend/ .

ENV VITE_API_URL=/api
RUN pnpm build

# Final Image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN apk add --no-cache nginx

COPY --from=backend-build /app/target/*.jar app.jar
COPY --from=frontend-build /app/dist ./dist

RUN mkdir -p /app/data /app/logs /etc/nginx/conf.d

RUN echo 'server { \
    listen 80; \
    root /app/dist; \
    index index.html; \
    location /api/ { \
        proxy_pass http://localhost:8080; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

ENV SERVER_PORT=8080 \
    JWT_SECRET=vmis-secret-key-change-this-in-production \
    JWT_EXPIRATION=86400000

EXPOSE 80

CMD ["sh", "-c", "java -jar app.jar & nginx -g 'daemon off;'"]