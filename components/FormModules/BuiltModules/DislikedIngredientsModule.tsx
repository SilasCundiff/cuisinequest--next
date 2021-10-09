import { useState, useCallback, useEffect, useMemo } from 'react';
import Module from '../Module';
import { DislikedIngredientsTypes } from '../../../types';
import debounce from 'lodash.debounce';
import { Search } from '@/components/Search/Search';
import axios from 'axios';
import { truncate } from '@/lib/helpers';
import { v4 as uuidv4 } from 'uuid';
// TODO this file contains a lot of functions with similar logic. Refactor if possible

const DislikedIngredientsModule = ({
  dislikedIngredients,
  setUserDisliked,
}) => {
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [retrievedIngredients, setRetrievedIngredients] = useState([{}]);
  const [ingredientLoading, setIngredientsLoading] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    setIngredientSearchTerm(e.target.value);
  };

  const moveIngredientToDislikes = (index) => {
    const selectedIngredient: Array<DislikedIngredientsTypes> =
      retrievedIngredients.filter((ingredient, ingredientIndex) =>
        index === ingredientIndex ? ingredient : null
      );

    if (
      dislikedIngredients &&
      dislikedIngredients.some((e) => e.id === selectedIngredient[0].id)
    ) {
      return;
    }

    const newDisliked = dislikedIngredients ? [...dislikedIngredients] : [];
    newDisliked.push(...selectedIngredient);
    setUserDisliked(newDisliked);
    const filteredArray = retrievedIngredients.filter(
      (ingredient: DislikedIngredientsTypes) =>
        ingredient.id !== selectedIngredient[0].id
    );
    setRetrievedIngredients(filteredArray);
  };

  const removeIngredientFromDislikes = (index) => {
    const selectedIngredient: Array<DislikedIngredientsTypes> =
      dislikedIngredients.filter((ingredient, ingredientIndex) =>
        index === ingredientIndex ? ingredient : null
      );

    const selectedIngredientNameArr = selectedIngredient[0].name.split(' ');
    const ingredientSearchTermArr = ingredientSearchTerm.split(' ');

    for (const word of selectedIngredientNameArr) {
      if (ingredientSearchTermArr.includes(word)) {
        const newRetrieved = retrievedIngredients
          ? [...retrievedIngredients]
          : [];
        newRetrieved.unshift(...selectedIngredient);
        setRetrievedIngredients(newRetrieved);
      }
    }

    if (dislikedIngredients) {
      const filteredArray = dislikedIngredients.filter(
        (ingredient) => ingredient.id !== selectedIngredient[0].id
      );
      setUserDisliked(filteredArray);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchIngredients = useCallback(
    debounce((ingredientSearchTerm) => {
      setIngredientsLoading(true);
      if (ingredientSearchTerm !== '') {
        axios
          .get(
            `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_RECIPES_API_KEY}&query=${ingredientSearchTerm}`
          )
          .then((res: { data: { results: [] } }) => {
            const ingredientResponse = res.data;

            setRetrievedIngredients(ingredientResponse.results);
            setIngredientsLoading(false);
          });
      }
    }, 750),
    []
  );

  const listBuilder = useMemo(() => {
    return (list: Array<DislikedIngredientsTypes>, moveFunc) => {
      if (list && list.length > 0) {
        return list.map((ingredient: DislikedIngredientsTypes, index) => {
          return (
            <div
              className='inline-block text-center py-1 px-4 bg-white rounded text-gray-50 text-xl mr-2 my-2 w-56 h-32'
              style={{ maxWidth: '180px' }}
              key={uuidv4()}
              onClick={() => {
                moveFunc(index);
              }}
            >
              <img
                className='m-auto h-20 w-auto'
                style={{ maxHeight: '100px', maxWidth: '100px' }}
                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                alt={`Visual representation of ${ingredient.name}`}
              />
              <div className='text-green-900 text-md w-full font-light mt-2'>
                {ingredient.name ? truncate(ingredient.name, 15) : null}
              </div>
            </div>
          );
        });
      }
    };
  }, []);

  const retrieveIngredientsList = listBuilder(
    retrievedIngredients,
    moveIngredientToDislikes
  );
  const dislikedIngredientList = listBuilder(
    dislikedIngredients,
    removeIngredientFromDislikes
  );

  useEffect(() => {
    searchIngredients(ingredientSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientSearchTerm]);

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Disliked Ingredients</Module.Heading>
        <Module.Paragraph>
          Don’t like an ingredient? Have a burning hatred of tomatoes? Just need
          a break from Bananas?
        </Module.Paragraph>
        <Module.Paragraph>
          Add ingredients to your disliked list and you can filter your searches
          to exclude them.
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <div className='flex flex-wrap'>
          <Search
            name=''
            value={ingredientSearchTerm}
            onChange={onChange}
            placeholder='Banish the Brussels Sprouts!'
          />
          <div
            className='h-72 flex-auto  p-4 bg-gray-100 mr-5 '
            style={{ minWidth: '49%', width: '49%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Search results
            </h3>
            <div className='overflow-y-auto grid grid-cols-3 h-5/6'>
              {ingredientLoading ? (
                <span className='col-span-3 flex items-center justify-center text-gray-600 text-2xl font-light'>
                  Search for an ingredient to add it to dislikes!
                </span>
              ) : (
                retrieveIngredientsList
              )}
            </div>
          </div>
          <div
            className='h-72 bg-gray-100 flex-auto p-4'
            style={{ minWidth: '49%', width: '49%' }}
          >
            <h3 className='text-md text-green-900 tracking-wide mb-4'>
              Your disliked ingredients
            </h3>
            <div className='overflow-y-auto grid grid-cols-3 h-5/6'>
              {dislikedIngredientList ? (
                dislikedIngredientList
              ) : (
                <span className='col-span-3 flex items-center justify-center text-gray-600 text-2xl font-light'>
                  Your disliked ingredients will appear here!
                </span>
              )}
            </div>
          </div>
        </div>
      </Module.Container>
    </Module>
  );
};

export { DislikedIngredientsModule };
