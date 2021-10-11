export const DietSelect = ({ diet, handleChange }) => {
  return (
    <select
      className='text-gray-600 text-4xl'
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
