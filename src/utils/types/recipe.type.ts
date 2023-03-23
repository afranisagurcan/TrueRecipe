declare namespace IRecipe {
  interface RecipeProps {
    recipeName: string;
    time: string;
    description: string;
    ingredients: string;
    image: string;
    rating: string;
  }

  interface DetailProps {
    name: string;
    item: string;
    iconName: string;
  }

  interface Props {
    recipes: RecipeProps[];
  }

}

export default IRecipe;
