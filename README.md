# AniTrivi

AniTrivi is a responsive web application written in [React](https://reactjs.org/), allowing users to guess one of the anime series they have watched based on previous attempts.
The application retrives data from the [AniList API](https://anilist.co/graphiql), providing up-to-date information about the anime series.

## Pre-requisites

AniTrivi was developed and tested in a stable environment, utilizing the following versions:

- [node.js v19.7.0](https://nodejs.org/en/)
- [npm v9.6.0](https://nodejs.org/en/download/)

This ensures that the application runs smoothly and efficiently.

## Installation

To install the application, clone the repository and install the dependencies:

```bash
git clone https://github.com/r1pk/anitrivi.git master
cd master
npm install
```

Run the application in development mode:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

Build the application for production:

```bash
npm run build
```

## Project structure

```bash
public                            # static files
src
   |-- apis                       # api related folders and files
   |   |-- anilist.js             # functions used to query the AniList API
   |   |-- query-client.js        # query client used in the application
   |-- components                 # grouped components used in the application
   |   |-- common                 # common components used across the application and other components
   |   |-- group                  # components grouped by their purpose
   |-- hooks                      # hooks used across the application
   |-- layouts                    # layout components
   |   |-- group                  # layout components grouped by their purpose
   |   |   |-- index.js           # exports main layout component from the folder
   |-- pages                      # page components
   |-- themes                     # theme related files used in the application
   |   |-- base.js                # base style object containing the global styles
   |   |-- dark.js                # dark theme object used in the application
   |-- utils                      # utility functions used across the application
   |-- App.jsx                    # main application component
   |-- AppRoutes.jsx              # available routes in the application
   |-- main.jsx                   # entry point of the application
```

## Live demo

Application is automatically deployed using Vercel.

[Live demo](https://anitrivi.vercel.app/)

## Author

- Patryk [r1pk](https://github.com/r1pk) Krawczyk

## License

[MIT](https://choosealicense.com/licenses/mit/)
