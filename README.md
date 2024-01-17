# Next Auth Example

This project is an example application for using NextAuth with the credentials provider.

## Technologies Used

- Next.js (React framework)
- Tailwind (CSS classes)
- shadcn/ui (component library)
- Docker (container virtualization for a local database)
- PostgreSQL (local database)
- Prisma (database ORM)
- NextAuth (authentication library)
- Playwright (end-to-end testing)
- Prettier (code formatting)
- GitHub Actions (CI)

## Setup

### Install Dependencies

```
npm install
```

### Configure Environment Variables

```
cp .env.example .env.local
```

Replace `AUTH_SECRET`.

### Run Setup Script

**Note**: you must have Docker installed and running.

```
npm run setup
```

## Running the App

```
npm run dev
```

## Tests

### Headless

```
npm run test
```

### Playwright UI

```
npm run test:ui
```

### Playwright Debug

```
npm run test:debug
```
