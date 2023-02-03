export const parseDrinkIngredientsData = (data) => (
  [data.drinks[0].strIngredient1, data.drinks[0].strIngredient2,
    data.drinks[0].strIngredient3, data.drinks[0].strIngredient4,
    data.drinks[0].strIngredient5, data.drinks[0].strIngredient6,
    data.drinks[0].strIngredient7, data.drinks[0].strIngredient8,
    data.drinks[0].strIngredient9, data.drinks[0].strIngredient10,
    data.drinks[0].strIngredient11, data.drinks[0].strIngredient12,
    data.drinks[0].strIngredient13, data.drinks[0].strIngredient14,
    data.drinks[0].strIngredient15, data.drinks[0].strIngredient16,
    data.drinks[0].strIngredient17, data.drinks[0].strIngredient18,
    data.drinks[0].strIngredient19, data.drinks[0].strIngredient20]
);
export const parseDrinkMeasuresData = (data) => (
  [data.drinks[0].strMeasure1, data.drinks[0].strMeasure2,
    data.drinks[0].strMeasure3, data.drinks[0].strMeasure4,
    data.drinks[0].strMeasure5, data.drinks[0].strMeasure6,
    data.drinks[0].strMeasure7, data.drinks[0].strMeasure8,
    data.drinks[0].strMeasure9, data.drinks[0].strMeasure10,
    data.drinks[0].strMeasure11, data.drinks[0].strMeasure12,
    data.drinks[0].strMeasure13, data.drinks[0].strMeasure14,
    data.drinks[0].strMeasure15, data.drinks[0].strMeasure16,
    data.drinks[0].strMeasure17, data.drinks[0].strMeasure18,
    data.drinks[0].strMeasure19, data.drinks[0].strMeasure20]
);

export const parseMealIngredientsData = (data) => (
  [data.meals[0].strIngredient1, data.meals[0].strIngredient2,
    data.meals[0].strIngredient3, data.meals[0].strIngredient4,
    data.meals[0].strIngredient5, data.meals[0].strIngredient6,
    data.meals[0].strIngredient7, data.meals[0].strIngredient8,
    data.meals[0].strIngredient9, data.meals[0].strIngredient10,
    data.meals[0].strIngredient11, data.meals[0].strIngredient12,
    data.meals[0].strIngredient13, data.meals[0].strIngredient14,
    data.meals[0].strIngredient15, data.meals[0].strIngredient16,
    data.meals[0].strIngredient17, data.meals[0].strIngredient18,
    data.meals[0].strIngredient19, data.meals[0].strIngredient20]
);

export const parseMealMeasuresData = (data) => (
  [data.meals[0].strMeasure1, data.meals[0].strMeasure2,
    data.meals[0].strMeasure3, data.meals[0].strMeasure4,
    data.meals[0].strMeasure5, data.meals[0].strMeasure6,
    data.meals[0].strMeasure7, data.meals[0].strMeasure8,
    data.meals[0].strMeasure9, data.meals[0].strMeasure10,
    data.meals[0].strMeasure11, data.meals[0].strMeasure12,
    data.meals[0].strMeasure13, data.meals[0].strMeasure14,
    data.meals[0].strMeasure15, data.meals[0].strMeasure16,
    data.meals[0].strMeasure17, data.meals[0].strMeasure18,
    data.meals[0].strMeasure19, data.meals[0].strMeasure20]
);

export const returnFavTemplateObject = (data) => {
  const recipeType = data.idMeal ? 'meal' : 'drink';
  return {
    id: data.idMeal || data.idDrink,
    type: recipeType,
    nationality: data.strArea || '',
    category: data.strCategory,
    alcoholicOrNot: data.strAlcoholic || '',
    name: data.strMeal || data.strDrink,
    image: data.strMealThumb || data.strDrinkThumb,
  };
};

export const returnDoneTemplateObject = (data) => {
  const recipeType = data.idMeal ? 'meal' : 'drink';
  console.log(data);
  const array = data.strTags !== null && data.strTags.split(',');
  const dateNow = new Date();
  const currDate = dateNow.toISOString();
  return [{
    id: data.idMeal || data.idDrink,
    nationality: data.strArea || '',
    name: data.strMeal || data.strDrink,
    category: data.strCategory,
    image: data.strMealThumb || data.strDrinkThumb,
    tags: array || [],
    alcoholicOrNot: data.strAlcoholic || '',
    type: recipeType,
    doneDate: currDate,
  }];
};
