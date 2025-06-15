# Currency Swap Form

A modern React application for currency swapping with a beautiful UI and robust functionality.

## Tech Stack

### Core Technologies
- **React 19** - Latest version of React for building user interfaces
- **TypeScript** - For type-safe code and better developer experience
- **Vite** - Next-generation frontend tooling for fast development
- **TailwindCSS** - Utility-first CSS framework for rapid UI development

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **Axios** - Promise-based HTTP client
- **React Hook Form** - Form handling with validation

### UI Components & Styling
- **Radix UI** - Unstyled, accessible components
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications
- **Tailwind Merge** - Utility for merging Tailwind classes

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Testing utilities for React
- **Axios Mock Adapter** - Mocking HTTP requests in tests

## Why This Tech Stack?

1. **React 19 + TypeScript**: Provides a robust foundation with type safety and modern React features
2. **Vite**: Offers extremely fast development server and build times
3. **TailwindCSS**: Enables rapid UI development with utility classes
4. **Zustand**: Simple and efficient state management without boilerplate
5. **React Hook Form**: Efficient form handling with built-in validation
6. **Jest + React Testing Library**: Industry-standard testing tools

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd currency-swap-form
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration.

## Configuration

### Mock Server Setup

The project includes a mock server for development and testing. The mock server is configured in the `src/mocks` directory.

To use the mock server:
1. Ensure you have the correct environment variables set in `.env`
2. The mock server will automatically intercept API calls in development mode

## Project Structure

```
src/
├── assets/         # Static assets (images, fonts, etc.)
├── components/     # Reusable UI components
├── config/         # Configuration files
├── hooks/          # Custom React hooks
├── mocks/          # Mock server and test data
├── pages/          # Page components
├── services/       # API services and data fetching
├── store/          # Zustand store and state management
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── __tests__/      # Test files
```

## Development

To start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
yarn build
```

To preview the production build:
```bash
yarn preview
```

## Testing

Run tests:
```bash
yarn test
```

Run tests in watch mode:
```bash
yarn test:watch
```

Generate test coverage report:
```bash
yarn test:coverage
```

## Code Quality

The project uses ESLint for code linting:
```bash
yarn lint
```