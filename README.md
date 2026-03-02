# Enhanced Beauty App - Frontend

A modern client management application built with React and Vite. This application provides a comprehensive solution for managing clients, tracking visits, and organizing service records. While it is currently tailored for beauty industry professionals, it serves as a flexible client management system for various service-based businesses.

## Features

- **User Authentication**: Secure login and registration system with token-based authentication
- **Client Management**: Create, view, edit, and manage client profiles
- **Visit Tracking**: Record and track client visits with detailed information
- **Protected Routes**: Secure pages that require authentication
- **Responsive Design**: Built with Bulma CSS framework for a clean, mobile-friendly interface
- **Real-time Updates**: Powered by TanStack React Query for efficient data fetching and caching

## Tech Stack

- **React 19** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM v7** - Client-side routing
- **TanStack React Query** - Server state management and data fetching
- **Bulma** - CSS framework for styling
- **ESLint** - Code linting and quality

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm or yarn
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/tcastellon/enhanced-beauty-app.git
cd enhanced-beauty-app/enhanced_beauty_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
```

This should point to your backend API URL. For development, the default is `http://localhost:8000/api`.

### 4. Set Up the Backend

This frontend requires the backend API to be running. Follow the setup instructions in the backend repository:

**Backend Repository**: [https://github.com/tcastellon/enhanced-beauty-api](https://github.com/tcastellon/enhanced-beauty-api)

Make sure the backend is running before starting the frontend application.

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
enhanced_beauty_frontend/
├── src/
│   ├── components/
│   │   ├── card/
│   │   │   └── VisitCard.jsx          # Visit card component
│   │   ├── layout/
│   │   │   ├── Layout.jsx             # Main layout wrapper
│   │   │   └── Navbar.jsx             # Navigation bar
│   │   └── AuthenticatedRoute.jsx     # Route protection component
│   ├── hooks/
│   │   ├── useAuth.js                 # Authentication hook
│   │   ├── useClients.js              # Client data management
│   │   ├── useServices.js             # Service data management
│   │   └── useVisits.js               # Visit data management
│   ├── pages/
│   │   ├── Home.jsx                   # Dashboard/home page
│   │   ├── Login.jsx                  # Login page
│   │   ├── RegisterPage.jsx           # User registration page
│   │   ├── ClientsPage.jsx            # Clients list view
│   │   ├── ClientDetailsPage.jsx      # Individual client details
│   │   ├── ClientFormPage.jsx         # New client form
│   │   ├── EditClientPage.jsx         # Edit client form
│   │   ├── VisitsPage.jsx             # Visits list view
│   │   ├── VisitsFormPage.jsx         # New visit form
│   │   └── EditVisitPage.jsx          # Edit visit form
│   ├── utils/
│   │   ├── api.js                     # API request utilities
│   │   └── auth.js                    # Authentication utilities
│   ├── App.jsx                        # Main app component with routing
│   ├── App.css                        # Global styles
│   └── main.jsx                       # Application entry point
├── public/                            # Static assets
├── index.html                         # HTML template
├── vite.config.js                     # Vite configuration
├── eslint.config.js                   # ESLint configuration
└── package.json                       # Project dependencies
```

## Key Features Explained

### Authentication System

The app uses token-based authentication. Users must register and log in to access the main features. Authentication tokens are stored locally and sent with each API request.

### Client Management

- View all clients in a list
- Add new clients with detailed information
- View individual client details and visit history
- Edit existing client information
- Delete clients (with proper permissions)

### Visit Tracking

- Record new visits for clients
- Track services provided during visits
- View visit history
- Edit visit details
- Manage visit dates and notes

### Data Management

The application uses TanStack React Query for:
- Efficient data fetching and caching
- Automatic background refetching
- Optimistic updates
- Loading and error states

## Routing Structure

- `/` - Home dashboard (protected)
- `/login` - User login
- `/register` - User registration
- `/clients` - Clients list (protected)
- `/clients/new` - Add new client (protected)
- `/clients/:id` - Client details (protected)
- `/clients/:id/edit` - Edit client (protected)
- `/visits` - Visits list (protected)
- `/visits/new` - Add new visit (protected)
- `/visits/:id/edit` - Edit visit (protected)

## Development Status

This application is currently in development and is not ready for production deployment. Use for development and testing purposes only.

## Browser Support

This application supports all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and not currently licensed for public use.

## Related Repositories

- **Backend API**: [enhanced-beauty-api](https://github.com/tcastellon/enhanced-beauty-api)

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.
