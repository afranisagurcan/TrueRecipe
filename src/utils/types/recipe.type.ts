declare namespace IRecipe {
  interface RecipeProps {
    recipeId:string;
    recipeName: string;
    time: string;
    description: string;
    ingredients: string;
    image: string;
    rating: string;
  }

  interface RecipeDetailsProps {
    recipeName: string;
    time: string;
    description: string;
    ingredients: string;
    image: string;
    rating: string;
    publisherId: string;
  }

  interface ListProps {
    name: string;
    item: string;
    iconName: string;
  }

  interface Props {
    recipes: RecipeProps[];
    userId?:string;
  }

  interface FavRecipe_User {
    recipeId:string;
    userId?:string;
    recipeName:string;
    image:string;
  }

  interface FavoriteProps {
    recipeName:string;
    recipeId:string;
    image:string;
  }

  interface FavoriteList {
    list: FavoriteProps[];
  }


}

export default IRecipe;
