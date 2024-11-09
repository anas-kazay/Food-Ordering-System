export const categorizeIngredients = (ingredients) => {
  return ingredients.reduce((acc, ingredient) => {
    const category = ingredient.category;
    if (!acc[category.name]) {
      acc[category.name] = [];
    }
    acc[category.name].push(ingredient);
    return acc;
  }, {});
};
