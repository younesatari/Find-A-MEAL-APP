/* Getting Elements and asign them to variables */
const input = document.getElementById('input');
const searchBtn = document.getElementById('search');
const meals = document.querySelector('.meals');

/* Event Listener */
searchBtn.addEventListener('click', getMeals);

/* Get Meals */
async function getMeals() {
   // Getting search Value
   let value = input.value;
   // Fetching Data from API
   const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
   const data = await res.json();
   // Meal Infos
   const mealInfos = data.meals;
   let output = '';
   mealInfos.forEach(meal => {

      output += `
      <!-- Single Meal -->
      <div class="col-md-4 mb-3 meal">
        <div class="card">
          <img class="card-img-top" src="${meal.strMealThumb}">
          <div class="card-body text-center">
            <h5 id="meal-name" class="card-title font-weight-bold">${meal.strMeal}</h5>
            <a id="recipe-btn" href="${meal.strYoutube}" class="btn btn-primary">Get Recipe</a>
          </div>
        </div>
      </div>
      `
   })
   meals.innerHTML = output;
}