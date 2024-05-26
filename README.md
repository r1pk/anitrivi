# AniTrivi

AniTrivi is a web application developed using [React](https://reactjs.org/) and [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/) that allows users to guess anime titles from their completed anime list based on provided clues.

## Screenshots

Guessing phase
![Guessing phase](https://i.imgur.com/3O8S0xi.png)

Featured anime revealed
![Featured anime revealed](https://i.imgur.com/hhcYY5D.png)

## Pre-requisites

Application was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Run Locally

Clone the project

```bash
  git clone https://github.com/r1pk/anitrivi.git
```

Go to the project directory

```bash
  cd anitrivi
```

Install dependencies

```bash
  npm install
```

Run the project locally

```bash
  npm run dev
```

## Project file structure

```bash
anitrivi/             # root directory
├─ public/            # static files
├─ src/               # application source code
│  ├─ apis/           # api related files
│  ├─ components/     # reusable components grouped by features
│  ├─ configs/        # configuration files
│  ├─ contexts/       # context declarations
│  ├─ hooks/          # custom hooks
│  ├─ layouts/        # layout components grouped by layout type
│  ├─ lib/            # declarations related to external libraries
│  ├─ pages/          # page components
│  ├─ themes/         # theme related files (e.g. colors, fonts)
│  ├─ utils/          # utility functions
│  ├─ App.jsx         # application root component
│  ├─ AppRoutes.jsx   # application routes
│  ├─ main.jsx        # application entry point
├─ .env               # default environment variables
```

## Demo

Application is automatically deployed using Vercel.

[AniTrivi Live Demo](https://anitrivi.vercel.app/)

## Authors

- [@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
