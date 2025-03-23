// URL
const BASE_URL = 'https://gist.githubusercontent.com/abdalabaaji/8ac1f0ff9c9e919c72c5f297a9b5266e/raw/a67887ba7445a6887be4c748fcfa0931f0dd165c/recipes'

const recipesList = document.querySelector('#recipes');

let recipes = localStorage.recipes ? JSON.parse(localStorage.recipes) : [];

if (recipes.length === 0) fetchRecipes();
else renderRecipes();

loadAddForm();

function loadAddForm() {
    const recipeForm = document.querySelector('#add-recipe-form');
    recipeForm.addEventListener('submit', addRecipe);
}

function addRecipe(e) {
    e.preventDefault();  
    
    const recipeName = document.getElementById('recipe-name').value;
    const recipeImg = document.getElementById('recipe-img').value;
    const recipeIngredients = document.getElementById('recipe-ingredients').value;
    const recipeInstructions = document.getElementById('recipe-instructions').value;

    
    const data = new FormData(e.target);  
    const recipe = Object.fromEntries(data);  

    
    const newRecipe = {
        id: Date.now().toString(), 
        name: recipeName, 
        image: recipeImg, 
        ingredients: recipeIngredients, 
        instructions: recipeInstructions 
    };

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    const recipeForm = document.querySelector('#add-recipe-form');
    recipeForm.reset();
    window.location.href = "index.html";
}


async function loadPage(pageUrl) {
    const mainContent = document.getElementById('main-content');
    const page = await fetch(pageUrl);
    const pageHTMLContent = await page.text();
    mainContent.innerHTML = pageHTMLContent;
    loadAddForm();
}

async function fetchRecipes() {
    const response = await fetch(BASE_URL);
    recipes = await response.json();
    localStorage.recipes = JSON.stringify(recipes);
    renderRecipes();
}

function renderRecipes() {
    const recipeItems = recipes.map(item => `
        <div class="recipe-card" id="${item.id}">
                <img src='${item.image}' class="card-img" />
                <div class="description">
                    <h1>'${item.name}'</h1>
                    <hr></hr>
                    <h2>Instructions</h2>
                    <p class="instructions">'${item.instructions}'
                    </p>
                </div>
                <div class="action-btns">
                    <button class="btn-update" onclick="updateRecipe('${item.id}')"> <i class="fa fa-pencil">Update</i></button>
                    <button class="btn-delete" onclick="deleteRecipe('${item.id}')"> <i class="fa fa-trash"> Delete </i></button>
                </div>
            </div>
        `).join('');
        recipesList.innerHTML = recipeItems;
}

async function updateRecipe(id) {
    
    await loadPage('edit_page.html');

   
    const updateValue = 'Update Recipe';
    const updateId = 'update-recipe-btn';
    document.querySelector('#add-recipe-btn').value = updateValue;
    document.querySelector('#add-recipe-btn').id = updateId;

    
    const recipeForm = document.querySelector('#add-recipe-form');

    const recipe = recipes.find(r => parseInt(r.id) === parseInt(id));

    document.querySelector('#recipe-name').value = recipe.name;
    document.querySelector('#recipe-img').value = recipe.image; 
    document.querySelector('#recipe-ingredients').value = recipe.ingredients;
    document.querySelector('#recipe-instructions').value = recipe.instructions;

    recipeForm.removeEventListener('submit', addRecipe);
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();  

        
        const data = new FormData(e.target);
        const updatedRecipeData = Object.fromEntries(data);

        
        recipe.name = updatedRecipeData['recipe-name'];
        recipe.image = updatedRecipeData['recipe-img']; 
        recipe.ingredients = updatedRecipeData['recipe-ingredients'];
        recipe.instructions = updatedRecipeData['recipe-instructions'];

        
        localStorage.setItem('recipes', JSON.stringify(recipes));

       
        recipeForm.reset();

        window.location.href = 'index.html';
    });
}



function deleteRecipe(id) {
    const index = recipes.findIndex(r => parseInt(r.id) === parseInt(id));
    recipes.splice(index, 1);
    localStorage.recipes = JSON.stringify(recipes);
    goBack();
}

async function goBack() {
    const allRecipes = localStorage.getItem('recipes');
    if (allRecipes) {
        recipes = JSON.parse(allRecipes);
        renderRecipes();
    }
    else {
        const response = await fetch(BASE_URL);
        recipes = await response.json();
        localStorage.recipes = JSON.stringify(recipes);
        renderRecipes();
    }
}
