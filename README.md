# Calorie Connoisseur

A web application that helps users track their calorie intake and exercise. Users can search for foods to get their caloric content and log exercises to calculate calories burned.

## Features

- Search for foods and get accurate calorie information
- Track meals and their caloric content
- Log exercises and calculate calories burned
- View net calories (calories consumed - calories burned)
- Clean, user-friendly interface

## Technologies Used

- Frontend:
  - HTML
  - CSS
  - JavaScript

- Backend:
  - Node.js
  - Express
  - Nutritionix API

## Setup and Installation (Locally)

1. Clone the repository: 
git clone https://github.com/shehrina/calorie-connoisseur.git
2. Install dependencies:
npm install
3. Create a `.env` file in the root directory and add your Nutritionix API credentials:
NUTRITIONIX_APP_ID=your_app_id
NUTRITIONIX_API_KEY=your_api_key
PORT=3000
4. Start the server:
npm start


5. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Track Food:**
   - Enter a food name in the search box
   - Click "Get Calories" to fetch caloric information
   - Click "Add Meal" to log the food

2. **Track Exercise:**
   - Enter the exercise name and duration
   - Click "Calculate Calories Burned" to log the exercise

3. **View Statistics:**
   - Total calories consumed
   - Total calories burned
   - Net calories

## API Reference

This project uses the Nutritionix API for food and exercise calculations. You'll need to sign up for API credentials at [Nutritionix](https://www.nutritionix.com/business/api).

## Acknowledgments

- Nutritionix API for providing accurate food and exercise data
- Express.js team for the excellent server framework
