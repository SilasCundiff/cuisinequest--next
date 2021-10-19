import { useState, useCallback, useEffect, memo } from 'react';
import Module from '@/components/PageComponents/FormModules/Module';
import { Search } from '@/components/ReusableComponents/SearchInputs/Search';
import ListBox from '@/components/ReusableComponents/ListBoxes/ListBox';
import { DislikedIngredientsTypes } from '@/types/types';
import axios from 'axios';
import debounce from 'lodash.debounce';

const WrappedDislikedIngredientsModule = ({ dislikedIngredients, setUserDisliked }) => {
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
  const [retrievedIngredients, setRetrievedIngredients] = useState<Array<DislikedIngredientsTypes> | undefined>();

  const onChange = (e) => {
    e.preventDefault();
    setIngredientSearchTerm(e.target.value);
  };

  const moveIngredientToDislikes = (index: number) => {
    const selectedIngredient: Array<DislikedIngredientsTypes> = retrievedIngredients.filter(
      (ingredient, ingredientIndex) => (index === ingredientIndex ? ingredient : null)
    );

    if (dislikedIngredients && dislikedIngredients.some((e) => e.id === selectedIngredient[0].id)) {
      return;
    }

    const newDisliked = dislikedIngredients ? [...dislikedIngredients] : [];
    newDisliked.push(...selectedIngredient);
    setUserDisliked(newDisliked);

    const filteredArray = retrievedIngredients.filter(
      (ingredient: DislikedIngredientsTypes) => ingredient.id !== selectedIngredient[0].id
    );
    setRetrievedIngredients(filteredArray);
  };

  const removeIngredientFromDislikes = (index: number) => {
    const selectedIngredient: Array<DislikedIngredientsTypes> = dislikedIngredients.filter(
      (ingredient, ingredientIndex) => (index === ingredientIndex ? ingredient : null)
    );

    if (retrievedIngredients && retrievedIngredients.some((e) => e.id === selectedIngredient[0].id)) {
      return;
    }
    const selectedIngredientNameArr = selectedIngredient[0].name.split(' ');
    const ingredientSearchTermArr = ingredientSearchTerm.split(' ');

    for (const word of selectedIngredientNameArr) {
      if (ingredientSearchTermArr.includes(word)) {
        const newRetrieved = retrievedIngredients ? [...retrievedIngredients] : [];
        newRetrieved.unshift(...selectedIngredient);
        setRetrievedIngredients(newRetrieved);
      }
    }

    if (dislikedIngredients) {
      const filteredArray = dislikedIngredients.filter((ingredient) => ingredient.id !== selectedIngredient[0].id);
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
          Don’t like an ingredient? Have a burning hatred of tomatoes? Just need a break from Bananas?
        </Module.Paragraph>
        <Module.Paragraph>
          Add ingredients to your disliked list and you can filter your searches to exclude them.
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
          <div className='max-w-1/2 min-w-1/2'>
            <ListBox
              heading='Search results'
              list={retrievedIngredients}
              placeholder='Search for an ingredient to add it to dislikes!'
              moveFunction={moveIngredientToDislikes}
            />
          </div>
          <div className='max-w-1/2 min-w-1/2'>
            <ListBox
              heading='Your disliked ingredients'
              list={dislikedIngredients}
              placeholder='Your disliked ingredients will appear here!'
              moveFunction={removeIngredientFromDislikes}
            />
          </div>
        </div>
      </Module.Container>
    </Module>
  );
};

const DislikedIngredientsModule = memo(WrappedDislikedIngredientsModule);
export { DislikedIngredientsModule };
