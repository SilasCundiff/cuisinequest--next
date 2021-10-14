import { useState, useEffect, useCallback } from 'react';
import { Search } from './Search/Search';
import { useUserContext } from '@/contexts/UserContext';
import { useSearchContext } from '@/contexts/SearchContext';
import { useRecipeListContext } from '@/contexts/RecipeListContext';
import { DietSelect } from './Select/DietSelect';
import axios from 'axios';
import { Checkbox } from './FormComponents/Checkbox';
import IntoleranceDropdown from './Dropsdowns/IntoleranceDropdown';
const RecipeNavSearch = () => {
  const { user, username, diet, setDiet, intolerances, setIntolerances } =
    useUserContext();
  const { currentSearch, setCurrentSearch, previousSearch, setPreviousSearch } =
    useSearchContext();

  const {
    setCurrentRecipeList,
    currentRecipeList,
    setPreviousRecipeList,
    previousRecipeList,
  } = useRecipeListContext();

  const [search, setSearch] = useState('');
  const [filterByDiet, setFilterByDiet] = useState(false);
  const [filterByIntolerance, setFilterByIntolerance] = useState(true);
  const [filterByDisliked, setFilterByDisliked] = useState(true);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const handleCheckToggle = (val, setFunc) => {
    setFunc(!val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (search === previousSearch) {
      setCurrentSearch(previousSearch);
      setCurrentRecipeList(previousRecipeList);
      return;
    }

    setPreviousSearch(currentSearch);
    setCurrentSearch(search);

    if (user && username) {
      // build query string
    }

    // axios
    //   .get(
    //     `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.NEXT_PUBLIC_RECIPES_API_KEY}&query=${currentSearch}`
    //   )
    //   .then((res) => {
    //     const searchRes = res.data;
    //     setPreviousRecipeList(currentRecipeList);
    //     setCurrentRecipeList(searchRes);
    //   });
  };
  const setListItemState = useCallback(
    (e, index) => {
      e.stopPropagation();
      const newIntolerances = [...intolerances];
      newIntolerances[index].avoid = !newIntolerances[index].avoid;
      setIntolerances(newIntolerances);
    },
    [intolerances, setIntolerances]
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
                checked={filterByDiet}
                emptyToCheck
                inline={false}
                onChange={(e) => {
                  handleCheckToggle(filterByDiet, setFilterByDiet);
                }}
                className='my-auto'
              />
            </label>
            <DietSelect
              handleChange={handleDietChange}
              diet={diet}
              className='text-reg my-auto'
            />
          </div>
          <div className='flex mx-auto min-w-1/4'>
            <label className={`my-auto`}>
              <Checkbox
                checked={filterByIntolerance}
                emptyToCheck
                inline={false}
                onChange={(e) => {
                  handleCheckToggle(
                    filterByIntolerance,
                    setFilterByIntolerance
                  );
                }}
              />
            </label>
            <IntoleranceDropdown
              dropdownListItems={intolerances}
              setListItemState={setListItemState}
            />
          </div>
          <div className='flex min-w-1/4'>
            <label className={`my-auto`}>
              <Checkbox
                checked={filterByDisliked}
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
