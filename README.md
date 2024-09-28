# Golden Hour App

## Overview

An app to determine when you will have this beautiful time of golden hour in your location.

The golden hour is the time during one hour before sunset. This is the time when you can take stunning photos and just enjoy watching the colors of the sky.

Please note that the beauty of the golden hour may vary depending on weather conditions and time of year.

Did you know? The blue hour (just before sunrise or after sunset) offers a different, equally desirable light for photography.

## Features

- **Golden Hour time:** determine when you will have this beautiful time of golden hour in your location.

## Usage

1. Type in your city.
2. Click the submit button.

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
