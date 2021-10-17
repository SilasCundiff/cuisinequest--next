import { useState, useCallback } from 'react';
import { Search } from './Search/Search';
import { useUserContext } from '@/contexts/UserContext';
import { useSearchContext } from '@/contexts/SearchContext';
import { useRecipeListContext } from '@/contexts/RecipeListContext';
import { DietSelect } from './Select/DietSelect';
import axios from 'axios';
import { Checkbox } from './FormComponents/Checkbox';
import IntoleranceDropdown from './Dropsdowns/IntoleranceDropdown';
import { StringCapitalizer } from '@/lib/helpers/StringCapitalizer';
import Router from 'next/router';

const queryStringBuilder: (currentQuery: string, paramKey: string, paramValues: string) => string = (
  qry,
  param,
  values
) => {
  let queryString: string = `${qry + '&' + param}=${values}`;

  return queryString;
};

const RecipeNavSearch = () => {
  const { user, username, diet, setDiet, intolerance, setIntolerance, dislikedIngredients } = useUserContext();
  const { setTerm, currentSearch, setCurrentSearch, previousSearch, setPreviousSearch } = useSearchContext();
  const {
    loadingRecipes,
    setLoadingRecipes,
    setCurrentRecipeList,
    currentRecipeList,
    setPreviousRecipeList,
    previousRecipeList,
  } = useRecipeListContext();

  const [search, setSearch] = useState('');
  const [filterByDiet, setFilterByDiet] = useState(false);
  const [filterByIntolerance, setFilterByIntolerance] = useState(false);
  const [filterByDisliked, setFilterByDisliked] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const handleCheckToggle = (val, setFunc) => {
    setFunc(!val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === '') {
      return;
    }
    let query = `&query=${search}`;

    if (user && username) {
      if (diet !== 'unselected' && filterByDiet) {
        query = queryStringBuilder(query, 'diet', diet);
      }

      if (filterByIntolerance) {
        const IntoleranceToFilter = [];
        for (const singleIntolerance in intolerance) {
          if (Object.prototype.hasOwnProperty.call(intolerance, singleIntolerance)) {
            const element = intolerance[singleIntolerance];
            if (element.avoid) IntoleranceToFilter.push(StringCapitalizer(element.name));
          }
        }
        query = queryStringBuilder(query, 'intolerances', IntoleranceToFilter.toString());
      }
      if (filterByDisliked) {
        const IngredientsToFilter = [];
        for (const singleIngredient in dislikedIngredients) {
          if (Object.prototype.hasOwnProperty.call(dislikedIngredients, singleIngredient)) {
            const element = dislikedIngredients[singleIngredient];
            IngredientsToFilter.push(StringCapitalizer(element.name));
          }
        }
        query = queryStringBuilder(query, 'excludeIngredients', IngredientsToFilter.toString());
      }
    }

    setCurrentSearch(query);

    if (query === previousSearch) {
      setCurrentRecipeList(previousRecipeList);
      setLoadingRecipes(false);
      return;
    }
    setPreviousSearch(currentSearch);
    setLoadingRecipes(true);

    axios
      .get(
        `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.NEXT_PUBLIC_RECIPES_API_KEY}&${query}&number=12&sort=popularity&sortDirection=desc`
      )
      .then((res) => {
        const searchRes = res.data;
        if (currentRecipeList) setPreviousRecipeList(currentRecipeList);
        setCurrentRecipeList(searchRes);
        setTerm(StringCapitalizer(search));
        setLoadingRecipes(false);
        Router.push('/search');
      });
  };

  const setListItemState = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newIntolerance = [...intolerance];
      newIntolerance[index].avoid = !newIntolerance[index].avoid;
      setIntolerance(newIntolerance);
    },
    [intolerance, setIntolerance]
  );

  return (
    <form className='max-w-full' onSubmit={handleSubmit}>
      <Search
        className={`bg-white text-center`}
        placeholder='Discover your perfect meal...'
        name='search'
        value={search}
        onChange={handleChange}
        disableEnterKey={false}
        disableSearchButton={false}
      />

      {user && username && (
        <div className='flex h-8 min-w-full max-w-full '>
          <div className='flex min-w-1/4 '>
            <label className={`my-auto`}>
              <Checkbox
                checked={!filterByDiet}
                emptyToCheck
                inline={false}
                onChange={() => {
                  handleCheckToggle(filterByDiet, setFilterByDiet);
                }}
                className='my-auto'
              />
            </label>
            <DietSelect handleChange={handleDietChange} diet={diet} className='text-reg my-auto' />
          </div>
          <div className='flex mx-auto min-w-1/4'>
            <label className={`my-auto`}>
              <Checkbox
                checked={!filterByIntolerance}
                emptyToCheck
                inline={false}
                onChange={() => {
                  handleCheckToggle(filterByIntolerance, setFilterByIntolerance);
                }}
              />
            </label>
            <IntoleranceDropdown dropdownListItems={intolerance} setListItemState={setListItemState} />
          </div>
          <div className='flex min-w-1/4'>
            <label className={`my-auto`}>
              <Checkbox
                checked={!filterByDisliked}
                emptyToCheck
                inline={false}
                onChange={(e) => {
                  handleCheckToggle(filterByDisliked, setFilterByDisliked);
                }}
              />
            </label>
            <div className='w-full bg-gray-50 border-gray-400 tracking-wider font-medium text-gray-400 rounded-md py-1 px-3 border text-center cursor-pointer'>
              Your Dislikes List
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default RecipeNavSearch;
