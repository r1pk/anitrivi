# AniTrivi

AniTrivi is a responsive web application that allows users to daily guess a randomly selected anime based on their completed anime list. AniTrivi is built using technologies such as [React](https://reactjs.org/), [React-Router](https://reactrouter.com), [Material-UI](https://mui.com/), and [AniList API](https://anilist.gitbook.io/anilist-apiv2-docs/) to fetch user data and anime series information.

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
public                            # static files
src
   |-- apis                       # api related folders and files
   |   |-- anilist.js             # functions used to query the AniList API
   |   |-- query-client.js        # query client used in the application
   |-- components                 # grouped components used in the application
   |   |-- common                 # common components used across the application
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

## Demo

Application is automatically deployed using Vercel.

[AniTrivi Live Demo](https://anitrivi.vercel.app/)

## Authors

- [@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
