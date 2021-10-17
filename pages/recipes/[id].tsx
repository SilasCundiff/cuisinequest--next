import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { useRemoveFavorite, useAddFavorite } from '@/lib/hooks';
import Container from '@/components/Containers/Container';
import DOMPurify from 'isomorphic-dompurify';
import ListBox from '@/components/FormComponents/ListBox';
import Image from 'next/image';
const Recipe = ({ recipeData }) => {
  const { id, title, readyInMinutes, servings, spoonacularScore, summary, extendedIngredients } = recipeData;
  const { user, username, favoriteRecipes } = useUserContext();
  const { addToFavorites } = useAddFavorite();
  const { removeFromFavorites } = useRemoveFavorite();
  const [recipeFavorited, setRecipeFavorited] = useState(false);
  console.log(recipeData);

  const handleFavorite = () => {
    if (user && username) {
      if (recipeFavorited) {
        return removeFromFavorites(id);
      }
      if (!recipeFavorited) {
        return addToFavorites(id, title);
      }
    }
  };

  useEffect(() => {
    const recipeInFavorites =
      favoriteRecipes &&
      favoriteRecipes.some((recipe) => {
        return recipe.recipeId === id;
      });
    setRecipeFavorited(recipeInFavorites);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteRecipes]);

  return (
    <Container className='flex flex-wrap'>
      {recipeData && (
        <>
          <h1 className='min-w-full'>{title}</h1>
          <div className='min-w-1/2 max-w-1/2'>
            <Image
              width={312}
              height={231}
              layout={'intrinsic'}
              src={`https://spoonacular.com/recipeImages/${id}-312x231.jpg`}
              alt={`Recipe: title`}
            />
          </div>
          <div className='min-w-1/2 max-w-1/2'>
            <div className='min-w-full'>
              {readyInMinutes} minutes {servings} Servings {spoonacularScore} Spoonacluar Score
            </div>
            {summary && (
              <div className='min-w-full' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }} />
            )}
          </div>
          <div className='min-w-full'>
            <button>View Full Recipe</button>
            <button>Heart Icon</button>
          </div>
          <div className='min-w-full'>
            <ListBox heading='Ingredients' list={extendedIngredients} placeholder='No ingredients found!' />
          </div>
        </>
      )}
    </Container>
  );
};

export default Recipe;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_RECIPES_API_KEY}&information`
    )
    .catch((err) => console.log(err));

  if (!res) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: { recipeData: res.data },
  };
}
