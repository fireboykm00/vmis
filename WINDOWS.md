# VMIS on Windows - Installation Guide

## Prerequisites

### 1. Java 21
Download and install from:
- **Eclipse Temurin**: https://adoptium.net/
- Or use **Oracle JDK 21**

Set environment variable:
```powershell
# Add to System Environment Variables
JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.x
# Add to PATH: %JAVA_HOME%\bin
```

### 2. Maven 3.9+
Download from: https://maven.apache.org/download.cgi

Set environment variable:
```powershell
MAVEN_HOME=C:\apache-maven-3.9.x
# Add to PATH: %MAVEN_HOME%\bin
```

### 3. Node.js 18+ and pnpm
```powershell
# Install Node.js from https://nodejs.org/
# Then install pnpm
npm install -g pnpm
```

---

## Installation Steps

### 1. Clone or Download the Project
Extract VMIS to `C:\vmis\` (or your preferred location)

### 2. Open PowerShell
```powershell
cd C:\vmis
```

### 3. Start Backend
```powershell
cd backend
mvn spring-boot:run
```

### 4. Start Frontend (in a new terminal)
```powershell
cd frontend
pnpm install
pnpm dev
```

---

## Using run.ps1 (PowerShell Script)

```powershell
# Open PowerShell as Administrator
# Navigate to VMIS folder
cd C:\vmis

# Run the script
.\run.ps1 dev       # All services
.\run.ps1 backend   # Backend only
.\run.ps1 frontend  # Frontend only
.\run.ps1 stop      # Stop all
```

---

## Quick Alternative - Using Winget

```powershell
# Install Java
winget install EclipseAdoptium.JDK.21

# Install Maven  
winget install Apache.Maven

# Install Node.js
winget install OpenJS.NodeJS.LTS
```

---

## Common Issues

### Port Already in Use
```powershell
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill the process
taskkill /PID <PID> /F
```

### Maven Not Found
```powershell
# Verify installation
mvn --version
java --version
```

---

## Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/h2-console

### Default Users
- Admin: `admin` / `admin123`
- Nurse: `nurse` / `nurse123`