# Build Backend
FROM eclipse-temurin:21-jdk-alpine AS backend-build
WORKDIR /app
RUN apk add --no-cache maven
COPY backend/pom.xml backend/src backend/mvnw backend/.mvn .mvn ./
RUN chmod +x mvnw && mvn clean package -DskipTests

# Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
RUN npm install -g pnpm
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend/ .

# Build with relative API URL for single-server deployment
ENV VITE_API_URL=/api
RUN pnpm build

# Final Image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy backend
COPY --from=backend-build /app/target/*.jar app.jar

# Copy frontend build
COPY --from=frontend-build /app/dist ./dist

# Setup nginx config for SPA + API proxy
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
    JWT_EXPIRATION=86400000 \
    JWT_ISSUER=vmis-app \
    JWT_AUDIENCE=vmis-client

EXPOSE 80

CMD ["sh", "-c", "java -jar app.jar & nginx -g 'daemon off;'"]