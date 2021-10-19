import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/contexts/UserContext';
import { useRemoveFavorite, useAddFavorite } from '@/lib/hooks';
import Container from '@/components/Containers/Container';
import DOMPurify from 'isomorphic-dompurify';
import ListBox from '@/components/FormComponents/ListBox';
import Image from 'next/image';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaUtensils, FaUtensilSpoon, FaStopwatch } from 'react-icons/fa';

const StyledSummaryContainer = styled.div`
  color: rgb(31, 41, 55);
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 300;
  padding: 1.25rem 1.5rem;
  & a {
    color: #22c55e;
    font-weight: 500;
  }
  & b {
    font-weight: 500;
  }
`;

const Recipe = ({ recipeData }) => {
  const { id, title, readyInMinutes, servings, spoonacularScore, summary, extendedIngredients, sourceUrl } = recipeData;
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
      favoriteRecipes.length > 0 &&
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
          <h1 className='min-w-full text-green-500 font-extrabold text-5xl mt-20 mb-7'>{title}</h1>
          <div className='min-w-1/2 max-w-1/2'>
            <Image
              className='rounded'
              width={624}
              height={462}
              layout={'intrinsic'}
              src={`https://spoonacular.com/recipeImages/${id}-312x231.jpg`}
              alt={`Recipe: title`}
            />
          </div>
          <div className='min-w-1/2 max-w-1/2 min-h-full'>
            <div className='min-w-full text-green-900 font-normal text-2xl flex mb-6  pl-5'>
              <span className='flex items-center mr-auto'>
                <span className='mr-2 my-auto text-xl'>
                  <FaStopwatch />
                </span>
                {readyInMinutes} minutes
              </span>
              <span className='flex items-center mx-auto'>
                <span className='mr-2 my-auto text-xl'>
                  <FaUtensils />
                </span>
                {servings} Servings
              </span>
              <span className='flex items-center mx-auto'>
                <span className='mr-2 my-auto text-xl'>
                  <FaUtensilSpoon />
                </span>
                {spoonacularScore} Spoonacluar Score
              </span>
            </div>
            {summary && (
              <StyledSummaryContainer
                className='min-w-full'
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(summary) }}
              />
            )}
          </div>
          <div className='min-w-full mb-8 mt-1 flex'>
            <button className='rounded font-medium mr-8 my-auto px-4 py-3 text-2xl text-gray-50 bg-green-500 hover:bg-green-400 transition-colors'>
              <a href={`${sourceUrl}`}>View Full Recipe</a>
            </button>
            {user && username && (
              <button
                onClick={handleFavorite}
                className='text-5xl text-green-500 my-auto hover:text-green-400 transition-colors'
              >
                {recipeFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            )}
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
