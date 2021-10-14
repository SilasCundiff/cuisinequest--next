export const DietSelect = ({ diet, handleChange, className = '' }) => {
  return (
    <select
      className={`text-gray-400 ${
        className ? className : 'text-3xl'
      }  w-full bg-gray-50 border-gray-400 tracking-wider font-medium text-gray-400 rounded-md px-3 py-1 border flex flex-col text-center cursor-pointer`}
      value={diet}
      onChange={(e) => handleChange(e)}
    >
      <option value='unselected'>--Select a Diet--</option>
      <option value='Gluten Free'>Gluten Free</option>
      <option value='Ketogenic'>Ketogenic</option>
      <option value='Lacto-Vegetarian'>Lacto-Vegetarian</option>
      <option value='Ovo-Vegetarian'>Ovo-Vegetarian</option>
      <option value='Paleo'>Paleo</option>
      <option value='Pescetarian'>Pescetarian</option>
      <option value='Primal'>Primal</option>
      <option value='Vegan'>Vegan</option>
      <option value='Vegetarian'>Vegetarian</option>
      <option value='Whole30'>Whole30</option>
    </select>
  );
};
