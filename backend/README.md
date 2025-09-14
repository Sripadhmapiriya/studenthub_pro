# StudentHub Pro Backend

A Spring Boot REST API backend for the StudentHub Pro application with PostgreSQL database integration.

## 🚀 Quick Start

### **Recommended: Use Start Script**

```bash
cd studenthub_pro
./start.bat
```

This starts both backend (port 8080) and frontend (port 4028) with default credentials:
- **Username**: `admin`
- **Password**: `admin123`

### **Manual Backend Only**

```bash
cd backend
.\apache-maven-3.9.4\bin\mvn.cmd clean package -DskipTests
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

**Note**: Manual JAR execution may cause automatic shutdown. Use start script for stable operation.

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.1.4
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **Build Tool**: Maven (Local: apache-maven-3.9.4)
- **Java Version**: 17

## 📋 Prerequisites

1. Java 17+
2. PostgreSQL with database `studentdb`
3. Update credentials in `application.properties` if needed

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate JWT token

### Students
- `GET /api/students` - Get all students (paginated)
- `POST /api/students` - Create new student
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student
- `GET /api/students/search?searchTerm=` - Search students
- `GET /api/students/filter?course=&year=&status=` - Filter students

## 💡 Example Requests

### Login
```json
POST /api/auth/login
{
  "usernameOrEmail": "admin",
  "password": "admin123"
}
```

### Create Student
```json
POST /api/students
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91 9876543210",
  "course": "computer-science",
  "year": "2",
  "addressLine1": "123 Main Street",
  "city": "Mumbai",
  "state": "mh",
  "country": "in",
  "postalCode": "400001"
}
```

## ⚙️ Configuration

```properties
server.port=8080
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
cors.allowed-origins=http://localhost:4028
jwt.expiration=86400000
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| HTTP 400 Error | Use `start.bat` script instead of manual JAR |
| "Failed to fetch" | Ensure backend runs on port 8080, PostgreSQL is running |
| Port already in use | `netstat -ano \| findstr 8080` then `taskkill /PID <PID> /F` |
| Database connection | Verify `studentdb` exists and credentials are correct |

### Test Backend Status
```bash
# Check if running
netstat -ano | findstr 8080

# Test login API
curl -X POST http://localhost:8080/api/auth/login -H "Content-Type: application/json" -d "{\"usernameOrEmail\":\"admin\",\"password\":\"admin123\"}"
```

## 📁 Project Structure

```
backend/
├── src/main/java/com/studenthub/backend/
│   ├── controller/       # REST endpoints
│   ├── service/         # Business logic
│   ├── model/           # JPA entities
│   ├── config/          # Security & CORS config
│   └── dto/             # Data transfer objects
├── apache-maven-3.9.4/  # Local Maven
└── target/              # Built JAR file
```

## 🔐 Security Features

- JWT tokens (24hr expiration)
- BCrypt password hashing
- Role-based access control
- CORS protection
- SQL injection prevention