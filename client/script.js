
// Remove the API credentials from here
let totalCalories = 0;
let totalBurned = 0;

function fetchCalories() {
    const foodName = document.getElementById("food-name").value;

    if (!foodName) {
        alert("Please enter a food name.");
        return;
    }

    fetch('/api/nutrients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: foodName })
    })
    .then(response => response.json())
    .then(data => {
        if (data.foods && data.foods[0]) {
            const calories = data.foods[0].nf_calories;
            document.getElementById("calorie-amount").value = calories;
        } else {
            alert("No calorie data found for this food.");
        }
    })
    .catch(error => {
        console.error("Error fetching calorie data:", error);
        alert("There was an error fetching calorie data.");
    });
}

// Rest of your existing functions remain the same...
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
    const exerciseDuration = parseInt(document.getElementById("exercise-duration").value);

    if (exerciseName === "" || isNaN(exerciseDuration) || exerciseDuration <= 0) {
        alert("Please enter a valid exercise name and duration.");
        return;
    }

    fetch('/api/exercise', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `${exerciseDuration} minutes of ${exerciseName}`
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exercises && data.exercises[0]) {
            const caloriesBurned = data.exercises[0].nf_calories;

            // Update total calories burned
            totalBurned += caloriesBurned;
            document.getElementById("total-burned").textContent = totalBurned;

            // Add exercise to the list
            const exerciseList = document.getElementById("exercise-list");
            const exerciseItem = document.createElement("li");
            exerciseItem.className = "exercise-item";
            exerciseItem.textContent = `${exerciseName} - ${exerciseDuration} minutes - ${caloriesBurned.toFixed(2)} kcal burned`;

            exerciseList.appendChild(exerciseItem);

            // Clear input fields
            document.getElementById("exercise-name").value = "";
            document.getElementById("exercise-duration").value = "";

            // Update net calories
            const netCalories = totalCalories - totalBurned;
            document.getElementById("net-calories").textContent = netCalories;
        } else {
            alert("No data found for this exercise.");
        }
    })
    .catch(error => {
        console.error("Error calculating calories burned:", error);
        alert("There was an error calculating calories burned.");
    });
};

