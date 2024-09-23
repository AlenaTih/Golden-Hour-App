# Golden Hour App

## Overview

<!-- Content collaboration and approval platform. Git for content making. -->

An app to identify when you will have this beautiful time of golden hour in your location.

Golden hour is the time during 1 hour before sunset. You can take the most awesome photos during this time, and just get pleasure watching the colors of the sky.

## Features

- **Feature:** description.

## Usage

1. Usage.

## Technologies Used

- React
- Vite
- HTML
- CSS
- JavaScript
- TypeScript
- React Router
- Appwrite
- OpenWeatherMap API
- Geocoding API
- Font Awesome CDN

## API

This project uses the [OpenWeatherMap API](https://openweathermap.org/current) to fetch sunset information and [Geocoding API](https://openweathermap.org/api/geocoding-api) to fetch the geocoordinates information.

## Database

Data is stored in the Appwrite Database.

## Contributors

- Alena Tikhomirova

## Contribution

If you have ideas to enhance this project or encounter any issues, feel free to contribute by opening an issue or submitting a pull request. Your input is highly valued!

## Contact

For inquiries or feedback, please contact me at alyonatihomirova9@gmail.com.

## Acknowledgments

Acknowledgments.








# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
