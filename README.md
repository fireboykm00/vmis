# Vaccine Management Information System (VMIS)

A comprehensive full-stack web application for managing child vaccination schedules and records, built with **Spring Boot** and **React.js**.

## 🚀 Features

### Authentication (Full)
- 🔐 Secure registration and login
- JWT-based authentication
- Role-based access control (Admin/Nurse)
- Password hashing with BCrypt

### Baby Management
- 👶 Register, view, edit, and delete baby records
- Search babies by name or phone number
- Fields: Name, Date of Birth, Gender, Guardian Name, Phone Number

### Vaccination Tracking
- 💉 Record vaccines given to babies
- View vaccination history per baby
- Fields: Vaccine Name, Date Given, Next Due Date

### Schedule Awareness
- 📅 Show upcoming vaccines based on due dates
- Highlight overdue vaccines
- Display completed vs pending vaccines

### Dashboard
- 📊 Overview of all babies and vaccination status
- Quick stats: Total babies, vaccines given, overdue cases

---

## 🛠 Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **SQLite** database (easy switch to MySQL/PostgreSQL)
- **Maven** build tool
- **Lombok** for boilerplate reduction

### Frontend
- **React 19** + **TypeScript 5.9**
- **Vite 8** build tool
- **Tailwind CSS 4.2** with **shadcn/ui** (Radix + Nova preset)
- **Lucide React** for icons
- **Sonner** for toast notifications
- **pnpm** package manager

---

## 📁 Project Structure

```
vmis/
├── backend/
│   ├── src/main/java/com/vmis/
│   │   ├── controller/       # REST API controllers
│   │   ├── service/          # Business logic
│   │   ├── repository/       # Data access
│   │   ├── model/            # Entity classes
│   │   ├── dto/              # Data transfer objects
│   │   ├── security/         # JWT & auth config
│   │   ├── config/           # App configuration
│   │   └── exception/        # Custom exceptions
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── layout/       # Layout components
│   │   │   └── common/       # Common components
│   │   ├── pages/            # Page components
│   │   │   ├── auth/         # Login, Register
│   │   │   ├── babies/       # Baby management
│   │   │   ├── vaccines/     # Vaccine records
│   │   │   └── dashboard/    # Dashboard
│   │   ├── services/         # API service functions
│   │   ├── hooks/            # Custom React hooks
│   │   ├── contexts/         # React contexts
│   │   ├── types/            # TypeScript types
│   │   └── lib/              # Utilities
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── ERD_DIAGRAM.dbml
│   └── API_DOCUMENTATION.md
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Installation |
|------|---------|--------------|
| Java | 17+ | `sudo apt install openjdk-17-jdk` (Linux) / Download from Oracle |
| Node.js | 20+ | `nvm install 20` |
| pnpm | latest | `npm install -g pnpm` |
| Maven | 3.6+ | `sudo apt install maven` (Linux) |

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Run the Spring Boot application (uses Maven Wrapper):
```bash
./mvnw spring-boot:run
```

The backend will start at `http://localhost:8080`

> **Note:** Database is auto-created as `vmis.db` in the backend folder. No manual setup needed.

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The frontend will start at `http://localhost:5173`

---

## 👤 Default Users

### Admin Account
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** ROLE_ADMIN

### Nurse Account
- **Username:** `nurse`
- **Password:** `nurse123`
- **Role:** ROLE_NURSE

Or register a new account through the signup page.

---

## 📱 Key Pages

### Public
- `/login` - Login page
- `/register` - Registration page

### Protected (Requires Login)
- `/dashboard` - Main dashboard with stats
- `/babies` - List and manage babies
- `/babies/new` - Add new baby
- `/babies/:id` - Baby profile & vaccination history
- `/babies/:id/edit` - Edit baby details
- `/vaccines/:babyId/new` - Record new vaccine

---

## 🔒 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/auth/me` | Get current user info |

### Babies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/babies` | List all babies |
| POST | `/api/babies` | Create new baby |
| GET | `/api/babies/:id` | Get baby by ID |
| PUT | `/api/babies/:id` | Update baby |
| DELETE | `/api/babies/:id` | Delete baby |
| GET | `/api/babies/search?q=name` | Search babies |

### Vaccines
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/babies/:babyId/vaccines` | List vaccines for baby |
| POST | `/api/babies/:babyId/vaccines` | Record new vaccine |
| PUT | `/api/vaccines/:id` | Update vaccine record |
| DELETE | `/api/vaccines/:id` | Delete vaccine record |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get dashboard statistics |

---

## 🗄️ Database Model

### User
```
id (Long)
username (String)
email (String)
password (String)
role (Enum: ADMIN, NURSE)
createdAt (Timestamp)
```

### Baby
```
id (Long)
name (String)
dateOfBirth (LocalDate)
gender (Enum: MALE, FEMALE)
guardianName (String)
phoneNumber (String)
createdAt (Timestamp)
updatedAt (Timestamp)
```

### VaccineRecord
```
id (Long)
babyId (Long)
vaccineName (String)
dateGiven (LocalDate)
nextDueDate (LocalDate)
notes (String)
createdAt (Timestamp)
```

---

## 🔧 Configuration

### Environment Variables (Optional)

The application works with defaults, but you can customize:

```bash
# Backend (.env in backend folder)
SERVER_PORT=8080
DB_URL=jdbc:sqlite:vmis.db
JWT_SECRET=your-secret-key-min-32-chars

# Frontend (.env in frontend folder)
VITE_API_URL=http://localhost:8080/api
```

### Switching to MySQL/PostgreSQL

1. Add dependency in `pom.xml`:
```xml
<!-- For MySQL -->
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

2. Update `application.properties`:
```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/vmis
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

---

## 🐳 Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up --build
```

The backend runs on port 8080, frontend on port 80.

---

## 💡 Project Highlights

- **Easy Database Switch**: SQLite for dev, MySQL/PostgreSQL for prod
- **JWT Authentication**: Secure, stateless auth
- **Role-based Access**: Admin manages users, Nurses manage records
- **Real-time Schedule Tracking**: Never miss a vaccine dose
- **Clean Architecture**: Controller → Service → Repository pattern
- **Modern UI**: React with shadcn/ui components

---

## 🎨 Frontend Template Details

The frontend uses a modern Vite + React + TypeScript setup with shadcn/ui component library.

### shadcn/ui Configuration

- **Style:** Radix
- **Preset:** Nova (Lucide icons, Geist font)
- **Base Color:** Neutral
- **CSS Variables:** Enabled
- **RTL:** Disabled

### Installed Components (38)

| Category | Components |
|----------|------------|
| **Layout** | card, sheet, dialog, drawer, separator, aspect-ratio |
| **Forms** | button, input, label, textarea, select, checkbox, radio-group, switch, slider |
| **Navigation** | breadcrumb, navigation-menu, pagination, tabs |
| **Data Display** | table, badge, avatar, skeleton, progress, alert |
| **Overlays** | alert-dialog, dropdown-menu, context-menu, popover, hover-card, tooltip |
| **Feedback** | sonner (toast) |
| **Other** | calendar, collapsible, menubar, resizable, scroll-area, toggle, toggle-group |

### Adding New Components

```bash
cd frontend
pnpm dlx shadcn@latest add [component-name]
```

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.4 | UI library |
| vite | 8.0.3 | Build tool |
| tailwindcss | 4.2.2 | CSS framework |
| radix-ui | 1.4.3 | Headless UI primitives |
| lucide-react | 1.7.0 | Icons |
| sonner | 2.0.7 | Toast notifications |
| date-fns | 4.1.0 | Date utilities |
| cmdk | 1.1.1 | Command palette |

---

## 📄 License

MIT License

---

Built with ❤️ for healthcare workers tracking child vaccinations