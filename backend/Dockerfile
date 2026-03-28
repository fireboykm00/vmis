# Build stage
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

COPY pom.xml .
COPY src ./src
COPY mvnw .
COPY .mvn .mvn

RUN chmod +x mvnw && mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create data directory for persistent DB
RUN mkdir -p /app/data /app/logs

COPY --from=build /app/target/*.jar app.jar

# Default values - can be overridden by environment variables
ENV SERVER_PORT=8080 \
    JWT_SECRET=vmis-secret-key-change-this-in-production-minimum-32-chars \
    JWT_EXPIRATION=86400000 \
    JWT_ISSUER=vmis-app \
    JWT_AUDIENCE=vmis-client \
    HIBERNATE_DDL_AUTO=update

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]