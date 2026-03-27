# Vaccine Management Information System (VMIS)

A comprehensive full-stack web application for managing child vaccination schedules and records.

## 🎯 Purpose

VMIS helps clinics and healthcare workers track babies and ensure they receive vaccines on time. The system provides a simple, efficient way to manage vaccination records, track upcoming doses, and identify overdue cases.

---

## ✨ Features

### Authentication & Access Control
- Secure JWT-based authentication
- Role-based access: Admin and Nurse roles
- Automatic user creation with default credentials

### Baby Management
- Register new babies with complete profiles
- View, edit, and delete baby records
- Search babies by name or phone number
- Track guardian contact information

### Vaccination Tracking
- Record vaccines administered to each baby
- Track vaccination history per baby
- Set and monitor next due dates
- Identify overdue vaccinations automatically

### Dashboard & Analytics
- Real-time statistics overview
- Total registered babies
- Vaccines administered count
- Overdue cases alert
- Monthly registration and vaccination reports

---

## 🏗️ Architecture

### Backend (Spring Boot)
The backend follows a layered architecture pattern:

```
com.vmis/
├── controller/      # REST API endpoints
├── service/         # Business logic
├── repository/      # Data access layer
├── model/           # Entity definitions
├── dto/             # Data transfer objects
├── security/        # JWT authentication
├── config/          # Application configuration
└── exception/       # Global exception handling
```

**Key Design Decisions:**
- **Stateless Authentication**: JWT tokens for secure API access
- **Role-Based Access**: Different permissions for Admin vs Nurse
- **RESTful API**: Clean, predictable endpoint structure
- **H2 Database**: In-memory for development, easily switchable to MySQL/PostgreSQL

### Frontend (React + TypeScript)
Single Page Application with routing:

```
src/
├── pages/           # Route components
├── components/      # UI components
├── services/        # API integrations
├── contexts/        # React context providers
├── types/           # TypeScript definitions
└── lib/             # Utilities
```

**Key Design Decisions:**
- **Context-Based Auth**: Token stored in localStorage
- **Axios Interceptors**: Automatic token attachment and 401 handling
- ** SPA Routing**: Protected dashboard routes behind login

---

## 📁 Project Structure

```
vmis/
├── backend/                    # Spring Boot API
│   ├── src/main/java/com/vmis/
│   │   ├── controller/         # REST endpoints
│   │   ├── service/            # Business logic
│   │   ├── repository/         # JPA repositories
│   │   ├── model/              # Entity classes
│   │   ├── dto/                # Request/Response DTOs
│   │   ├── security/           # JWT components
│   │   └── config/             # App configuration
│   └── src/main/resources/
│       └── application.properties
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/         # UI components
│   │   ├── services/           # API client functions
│   │   ├── contexts/           # React contexts
│   │   └── types/              # TypeScript interfaces
│   └── package.json
├── run.sh                      # Linux/Mac runner
├── run.ps1                     # Windows runner
└── README.md
```

---

## 🚀 Quick Start

### Run the Application

```bash
# Linux/Mac
./run.sh dev

# Windows PowerShell
.\run.ps1 dev
```

Or manually:

```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (new terminal)
cd frontend
pnpm install
pnpm dev
```

### Access the App

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080/api |
| Health | http://localhost:8080/api/health |

### Default Login

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Nurse | nurse | nurse123 |

---

## 🔗 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login (returns JWT)
GET    /api/auth/me          - Get current user
```

### Babies
```
GET    /api/babies                    - List all babies
POST   /api/babies                    - Create new baby
GET    /api/babies/:id                - Get baby details
PUT    /api/babies/:id                - Update baby
DELETE /api/babies/:id                - Delete baby
GET    /api/babies/search?q=query     - Search babies
```

### Vaccines
```
GET    /api/babies/:id/vaccines       - List baby's vaccines
POST   /api/babies/:id/vaccines       - Record new vaccine
PUT    /api/vaccines/:id              - Update vaccine record
DELETE /api/vaccines/:id              - Delete vaccine record
```

### Dashboard
```
GET    /api/dashboard/stats           - Get statistics
```

---

## 📊 Database Schema

### User
- id, username, email, password, fullName, roles

### Baby
- id, name, dateOfBirth, gender, guardianName, phoneNumber, address, notes

### VaccineRecord
- id, babyId, vaccineName, dateGiven, nextDueDate, batchNumber, notes, administeredBy

---

## 🔄 Switching Databases

The app uses H2 in-memory database by default. To use MySQL:

1. Add MySQL connector to `pom.xml`
2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/vmis
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

---

## 📄 License

MIT License

---

Built with ❤️ for healthcare workers