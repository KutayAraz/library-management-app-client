# Library Management System Frontend

A modern React application for managing library books and user borrowing. Built with TypeScript, Redux Toolkit, and Material UI.

## Features

- Browse and search library book catalog
- View detailed book information including availability and ratings
- Manage user borrowing and returns
- Rate books upon return
- Responsive design optimized for all devices
- Clean, intuitive user interface

## Tech Stack

- React 18
- TypeScript 5
- Redux Toolkit & RTK Query for state management
- React Router v7 for routing
- Material UI v6 for components
- Vite for build tooling

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/KutayAraz/library-management-app-server.git
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # Redux store and RTK Query services
├── types/         # TypeScript type definitions
```

## Future Improvements

1. **Features**

   - Advanced search and filtering for books
   - User authentication and authorization
   - Book recommendations based on user history

2. **Technical Enhancements**

   - Implement unit tests with Jest and React Testing Library
   - Add error boundary components
   - Implement comprehensive logging system

3. **UX Improvements**

   - Dark mode support
   - Accessibility improvements (WCAG compliance)
   - Better mobile navigation
   - Rich text book descriptions
   - Image support for book covers
