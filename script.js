
// Initialize total calories and burned calories
let totalCalories = 0;
let totalBurned = 0;

// Replace these with your actual Nutritionix API credentials
const APP_ID = CONFIG.APP_ID;
const API_KEY = CONFIG.API_KEY;

// Function to fetch calories from the Nutritionix API for meals
function fetchCalories() {
  const foodName = document.getElementById("food-name").value;

  if (!foodName) {
    alert("Please enter a food name.");
    return;
  }

  fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": CONFIG.APP_ID,
      "x-app-key": CONFIG.API_KEY
    },
    body: JSON.stringify({ query: foodName })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.foods && data.foods[0]) {
        const calories = data.foods[0].nf_calories;
        document.getElementById("calorie-amount").value = calories;
      } else {
        alert("No calorie data found for this food.");
      }
    })
    .catch((error) => {
      console.error("Error fetching calorie data:", error);
      alert("There was an error fetching calorie data.");
    });
}

// Function to add a meal and update total calories
function addMeal() {
  const foodName = document.getElementById("food-name").value;
  const calorieAmount = parseInt(
    document.getElementById("calorie-amount").value
  );

  if (foodName === "" || isNaN(calorieAmount) || calorieAmount <= 0) {
    alert("Please enter a valid food name and calorie amount.");
    return;
  }

  totalCalories += calorieAmount;
  document.getElementById("total-calories").textContent = totalCalories;

  const mealList = document.getElementById("meal-list");
  const mealItem = document.createElement("li");
  mealItem.className = "meal-item";
  mealItem.textContent = `${foodName} - ${calorieAmount} kcal`;

  mealList.appendChild(mealItem);

  // Clear input fields
  document.getElementById("food-name").value = "";
  document.getElementById("calorie-amount").value = "";
}

// Function to calculate calories burned using Nutritionix API based on exercise name and duration
function calculateCaloriesBurned() {
  const exerciseName = document.getElementById("exercise-name").value;
  const exerciseDuration = parseInt(
    document.getElementById("exercise-duration").value
  );

  if (exerciseName === "" || isNaN(exerciseDuration) || exerciseDuration <= 0) {
    alert("Please enter a valid exercise name and duration.");
    return;
  }

  // Make an API request to calculate calories burned
  fetch("https://trackapi.nutritionix.com/v2/natural/exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": CONFIG.APP_ID,
      "x-app-key": CONFIG.API_KEY
    },
    body: JSON.stringify({
      query: `${exerciseDuration} minutes of ${exerciseName}`
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exercises && data.exercises[0]) {
        const caloriesBurned = data.exercises[0].nf_calories;

        // Update total calories burned
        totalBurned += caloriesBurned;
        document.getElementById("total-burned").textContent = totalBurned;

        // Add exercise to the list
        const exerciseList = document.getElementById("exercise-list");
        const exerciseItem = document.createElement("li");
        exerciseItem.className = "exercise-item";
        exerciseItem.textContent = `${exerciseName} - ${exerciseDuration} minutes - ${caloriesBurned.toFixed(
          2
        )} kcal burned`;

        exerciseList.appendChild(exerciseItem);

        // Clear input fields
        document.getElementById("exercise-name").value = "";
        document.getElementById("exercise-duration").value = "";

        // Update net calories (calories consumed - calories burned)
const netCalories = totalCalories - totalBurned;
document.getElementById("net-calories").textContent = netCalories;

// Optional: You can also call a function to update Combined Calories if needed
updateCombinedCalories();

      } else {
        alert("No data found for this exercise.");
      }
    })
    
    };

