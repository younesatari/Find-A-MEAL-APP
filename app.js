/* Getting Elements and asign them to variables */
const input = document.getElementById('input');
const meals = document.querySelector('.meals');
const searchForm = document.getElementById('search-form');
const modaleContainer = document.querySelector('.modale-container');
const modale = document.querySelector('.modale');
const closeModale = document.querySelector('.fa-times');

/* Event Listener */
searchForm.addEventListener('submit', e => getMeals(e));
meals.addEventListener('click', e => getRecipe(e));
modale.addEventListener('click', e => closeModal(e));

/* Get Meals */
async function getMeals(e) {
   // Prevent Default
   e.preventDefault();
   // Getting search Value
   let value = input.value;
   // Fetching Data from API
   const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
   const data = await res.json();
   // Meal Infos
   const mealInfos = data.meals;
   // Output
   let output = '';
   mealInfos.forEach(meal => {

      output += `<!-- Single Meal -->
      <div class="col-md-4 mb-4">
         <div class="card">
            <img class="card-img-top" src="${meal.strMealThumb}">
            <div class="card-body text-center">
               <h5 id="meal-name" class="card-title font-weight-bold">${meal.strMeal}</h5>
               <a href="#" class="btn btn-primary recipe-btn" data-toggle="modal" data-target="#${meal.idMeal}">Get Recipe</a>
          </div>
         </div>
         <div class="d-none hidden">
            <p>${meal.strInstructions}</p>
            <p>${meal.strYoutube}</p>
         </div>
      </div> `
   })
   meals.innerHTML = output;
} 

/* Get Recipe */
function getRecipe(e) {
   if(e.target.classList.contains('recipe-btn')) {
      let mealName = e.target.previousElementSibling.innerHTML;
      let mealImg = e.target.parentElement.previousElementSibling.src;
      let mealRecipe = e.target.parentElement.parentElement.nextElementSibling.childNodes[1].innerHTML;
      let mealTutorial = e.target.parentElement.parentElement.nextElementSibling.childNodes[3].innerHTML;
      

      modaleContainer.classList.add('show-modale-container');
      modale.classList.add('show-modale');

      document.querySelector('.meal-name').innerHTML = mealName;
      document.querySelector('.Instructions').innerHTML = mealRecipe;
   }

}

/* Close Modale */
function closeModal(e) {
   if(e.target.classList.contains('fa-times')) {
      modaleContainer.classList.remove('show-modale-container');
      modale.classList.remove('show-modale');
   }
}
 