# Weather App

A comprehensive weather application that provides routine weather updates. The app is built with TypeScript and Python using React and Flask.

## Table of Contents

- [Features](#features)
- [Technologies / API Services](#Technologies)
- [Installation](#installation)

- [Project Structure](#project-structure)

## Features

- Fetch and display daily and hourly weather data using external weather APIs. Supports 5 day forecast and 24 hour windows
- Dynamic user location search features. Supports most named locations and different timezones
- AI LLM integration

## Technologies
- Python
- TypeScript
- Flask
- React
- Open-Meteo Weather API
- OpenCage Geocode API
- Google Gemini API
## Installation

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
4. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

### Frontend

1. Navigate to the [`frontend`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fbuisw%2FOneDrive%2FDocuments%2F.Personal%2FWork%2FPM%20Accelerator%20(Fall%202024)%2Fweather-app%2Ffrontend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\buisw\OneDrive\Documents\.Personal\Work\PM Accelerator (Fall 2024)\weather-app\frontend") directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

### Backend

1. Start the backend server:
    ```sh
    python app.py
    ```

### Frontend

1. Start the frontend development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- **backend/**: Contains the backend code for the project.
  - **app.py**: The main entry point for the backend application.
  - **requirements.txt**: Lists the dependencies required for the backend.
  - **services/**: Contains service modules for external integrations.
    - **externals.py**: Handles external API calls.
  - **tests/**: Contains test cases for the backend.
    - **externals_test.py**: Tests for the external service integrations.
    - **test_location_endpoints.py**: Tests for location-related endpoints.
    - **test_weather_endpoints.py**: Tests for weather-related endpoints.
  - **utils/**: Utility functions used across the backend.
    - **date_conversion.py**: Utility functions for date conversions.
- **frontend/**: Contains the frontend code for the project.
  - **public/**: Static files for the frontend.
    - **index.html**: The main HTML file for the frontend.
    - **manifest.json**: Metadata for the web app.
  - **src/**: Source code for the frontend.
    - **api/**: API service modules for the frontend.
    - **components/**: React components used in the frontend.
    - **App.tsx**: The main React component for the frontend.
    - **App.css**: Styles for the main React component.
    - **index.tsx**: The entry point for the React application.
    - **index.css**: Global styles for the frontend.
  - **package.json**: Lists the dependencies and scripts for the frontend.
  - **tsconfig.json**: TypeScript configuration for the frontend.
- **README.md**: The README file for the project.
