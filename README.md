# CuisineQuest V2 (NextJS and Firebase)

CuisineQuest is a recipe browser made using React, NextJS, [Tailwind](https://tailwindcss.com/), and the [Spoonacular](https://spoonacular.com/food-api) API.

View the [Figma](https://www.figma.com/file/3XKkJLAIlIsSjV0vpkz266/CuisineQuestV2?node-id=0%3A1) Prototype.

---

## How to run

### REQUIRES AN API KEY FROM SPOONACULAR TO QUERY

Save the api key in a .env file with the name of: `REACT_APP_RECIPES_API_KEY={your_api_key_here}`

**example search query with no params**

`api.spoonacular.com/recipes/complexSearch/?apiKey={your_api_key_here}=salad&diet=ketogenic&intolerances=egg,gluten&excludeIngredients=tomato`

**example search query with no params**

`api.spoonacular.com/recipes/complexSearch/?apiKey={your_api_key_here}=salad&diet=ketogenic&intolerances=egg,gluten&excludeIngredients=tomato`

## User Data

The user data will be used to provide certain functionality and conveniences to the user, such as a list of favorites they can easily view, and default search filters.

     - Usernames collection contains a list of users
     - Each user in the collection has the following
       - Favorites collection
       - Disliked ingredients collection
       - A Diet Type
       - An allergy/intolerance collection


## Previous Version info

The first version was a simple app that only allowed the user to perform a simple search. In V2, I will be porting the project from Vanilla React to NextJS and adding login support through Firebase google Oauth.

Screenshots of V1:

  <img src="project_assets/cuisinequest-desktop.png"
       alt="Desktop View"
       style=" margin-right: 10px; width: 75%;" />
  <img src="project_assets/cuisinequest-mobile.png"
       alt="Desktop View"
       style="margin-right: 10px; width: 25%;" />


View [V1's github](https://github.com/SilasCundiff/cuisinequest)



