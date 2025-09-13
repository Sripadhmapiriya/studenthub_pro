# StudentHub Pro Backend

A Spring Boot REST API backend for the StudentHub Pro application with PostgreSQL database integration.

## Features

- **Student Management**: Complete CRUD operations for student records
- **Authentication**: JWT-based authentication system
- **Database Integration**: PostgreSQL database with JPA/Hibernate
- **RESTful APIs**: Well-structured REST endpoints
- **Security**: Spring Security with role-based access control
- **CORS Support**: Configured for frontend communication
- **Data Validation**: Request validation with detailed error handling

## Technology Stack

- **Framework**: Spring Boot 3.1.4
- **Database**: PostgreSQL
- **Security**: Spring Security + JWT
- **ORM**: JPA/Hibernate
- **Build Tool**: Maven
- **Java Version**: 17

## Prerequisites

1. **Java 17** or higher
2. **PostgreSQL** installed and running
3. **Maven** 3.6+ for building the project

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE studentdb;
```

2. Update database credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=shariraj04
```

## Installation & Running

1. **Clone or navigate to the backend directory**:
```bash
cd backend
```

2. **Install dependencies**:
```bash
mvn clean install
```

3. **Run the application**:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## Default Login Credentials

A default admin user is automatically created on first startup:
- **Username**: `admin`
- **Password**: `admin123`
- **Email**: `admin@studenthub.com`

## API Endpoints

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
- `PATCH /api/students/{id}/status?status=` - Update enrollment status
- `GET /api/students/stats` - Get student statistics
- `GET /api/students/stats/courses` - Get course-wise statistics
- `GET /api/students/stats/years` - Get year-wise statistics

## Request/Response Examples

### Login Request
```json
POST /api/auth/login
{
  "usernameOrEmail": "admin",
  "password": "admin123"
}
```

### Create Student Request
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

### Student Response
```json
{
  "id": 1,
  "studentId": "STU-2025-001",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91 9876543210",
  "course": "computer-science",
  "year": "2",
  "addressLine1": "123 Main Street",
  "city": "Mumbai",
  "state": "mh",
  "country": "in",
  "postalCode": "400001",
  "enrollmentStatus": "ACTIVE",
  "createdAt": "2025-09-13T10:30:00",
  "updatedAt": "2025-09-13T10:30:00"
}
```

## Database Schema

The application automatically creates the following tables:
- `users` - User authentication data
- `students` - Student information and academic details

## Configuration

Key configuration properties in `application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=shariraj04

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=studenthub-secret-key-for-jwt-token-generation-2024
jwt.expiration=86400000

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173
```

## Development

### Running in Development Mode
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Building for Production
```bash
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Testing

Run the test suite:
```bash
mvn test
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/studenthub/backend/
│   │   │   ├── config/           # Configuration classes
│   │   │   ├── controller/       # REST controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # JPA entities
│   │   │   ├── repository/      # Data repositories
│   │   │   ├── service/         # Business logic
│   │   │   └── StudentHubBackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml
└── README.md
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## CORS Configuration

CORS is configured to allow requests from:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

## Security

- JWT tokens expire after 24 hours
- Passwords are hashed using BCrypt
- Role-based access control (ADMIN, TEACHER, STUDENT)
- CORS protection enabled
- SQL injection prevention via JPA

## Support

For issues or questions, please check the application logs or contact the development team.