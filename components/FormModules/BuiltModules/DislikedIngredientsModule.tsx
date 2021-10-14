import { useState, useCallback, useEffect, useMemo, memo } from 'react';
import Module from '../Module';
import { DislikedIngredientsTypes } from '../../../types';
import debounce from 'lodash.debounce';
import { Search } from '@/components/Search/Search';
import axios from 'axios';
import { truncate } from '@/lib/helpers';
import { v4 as uuidv4 } from 'uuid';

const WrappedDislikedIngredientsModule = ({
  dislikedIngredients,
  setUserDisliked,
}) => {
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [retrievedIngredients, setRetrievedIngredients] = useState<
    Array<DislikedIngredientsTypes> | undefined
  >();

  const onChange = (e) => {
    e.preventDefault();
    setIngredientSearchTerm(e.target.value);
  };

  const moveIngredientToDislikes = (index: number) => {
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

  const removeIngredientFromDislikes = (index: number) => {
    const selectedIngredient: Array<DislikedIngredientsTypes> =
      dislikedIngredients.filter((ingredient, ingredientIndex) =>
        index === ingredientIndex ? ingredient : null
      );

    if (
      retrievedIngredients &&
      retrievedIngredients.some((e) => e.id === selectedIngredient[0].id)
    ) {
      return;
    }
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
      if (ingredientSearchTerm !== '' && ingredientSearchTerm !== undefined) {
        axios
          .get(
            `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_RECIPES_API_KEY}&query=${ingredientSearchTerm}`
          )
          .then((res: { data: { results: [] } }) => {
            const ingredientResponse = res.data;

            setRetrievedIngredients(ingredientResponse.results);
          });
      }
    }, 750),
    []
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
            disableEnterKey
            disableSearchButton
          />
          <ListBox
            heading='Search results'
            list={retrievedIngredients}
            placeholder='Search for an ingredient to add it to dislikes!'
            moveFunction={moveIngredientToDislikes}
          />
          <ListBox
            heading='Your disliked ingredients'
            list={dislikedIngredients}
            placeholder='Your disliked ingredients will appear here!'
            moveFunction={removeIngredientFromDislikes}
          />
        </div>
      </Module.Container>
    </Module>
  );
};

const listBuilder = (list: Array<DislikedIngredientsTypes>, moveFunc) => {
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

interface DislikeBoxProps {
  heading: string;
  placeholder: string;
  list: Array<DislikedIngredientsTypes>;
  moveFunction: (index: number) => void;
}

const WrappedListBox = ({
  heading,
  list,
  placeholder,
  moveFunction,
}: DislikeBoxProps) => {
  const BuiltList = listBuilder(list, moveFunction);

  return (
    <div
      className='h-72 bg-gray-100 flex-auto p-4'
      style={{ minWidth: '49%', width: '49%' }}
    >
      <h3 className='text-md text-green-900 tracking-wide mb-4'>{heading}</h3>

      <div className='overflow-y-auto grid grid-cols-3 h-5/6'>
        {BuiltList ? (
          BuiltList
        ) : (
          <span className='col-span-3 flex items-center justify-center text-gray-600 text-2xl font-light'>
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};

const ListBox = memo(WrappedListBox, (prevProps, nextProps) => {
  if (prevProps.list !== nextProps.list) return false;
  return true;
});
const DislikedIngredientsModule = memo(WrappedDislikedIngredientsModule);
export { DislikedIngredientsModule };
