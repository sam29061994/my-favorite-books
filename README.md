# My Favorite Books

A modern web application built with React, TypeScript, and Vite that allows users to manage and browse their book collection.

## Tech Stack

- React 18
- TypeScript
- Vite
- SCSS for styling

## Getting Started

1. Clone the repository

```bash
git clone [your-repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## Development

The application uses:

- Vite for fast development and building
- TypeScript for type safety
- SCSS modules for component styling
- ESLint for code quality

### ESLint Configuration

For production deployment, enable type-aware lint rules:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

## Building for Production

Build the application:

```bash
npm run build
```
