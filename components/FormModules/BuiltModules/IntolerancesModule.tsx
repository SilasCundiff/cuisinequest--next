import Module from '../Module';
import { IntoleranceTypes } from '../../../types';
import { Checkbox } from '../../FormComponents/Checkbox';
import { StringCapitalizer } from '@/lib/helpers/StringCapitalizer';

const initialIntolerances = [
  { name: 'dairy', avoid: false },
  { name: 'egg', avoid: false },
  { name: 'gluten', avoid: false },
  { name: 'grain', avoid: false },
  { name: 'peanut', avoid: false },
  { name: 'seafood', avoid: false },
  { name: 'sesame', avoid: false },
  { name: 'shellfish', avoid: false },
  { name: 'soy', avoid: false },
  { name: 'sulfite', avoid: false },
  { name: 'tree_nut', avoid: false },
  { name: 'wheat', avoid: false },
];

const IntolerancesModule = (props) => {
  const { userIntolerances = initialIntolerances, setUserIntolerances } = props;

  const handleAvoidState = (e, index: number) => {
    const newIntolerances = [...userIntolerances];
    newIntolerances[index].avoid = e.target.checked;
    setUserIntolerances(newIntolerances);
  };

  const intoleranceList =
    userIntolerances &&
    userIntolerances.map((intolerance: IntoleranceTypes, index: number) => (
      <div key={intolerance.name} className='mx-auto my-6 min-w-1/4 flex'>
        <label
          className={`${
            intolerance.avoid ? 'text-red-500' : 'text-green-500'
          } text-3xl font-bold ml-12 mr-auto`}
        >
          <Checkbox
            className='mr-1'
            checked={intolerance.avoid}
            onChange={(e) => handleAvoidState(e, index)}
          />
          {StringCapitalizer(intolerance.name)}
        </label>
      </div>
    ));

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Allergies and Intolerances</Module.Heading>
        <Module.Paragraph>
          We want everyone to have a safe journey. To make your quest a bit
          easier to navigate, we give you a way to filter by a list of
          intolerances.
        </Module.Paragraph>
        <Module.Paragraph>
          Select allergies and intolerances to exclude, and you can filter them
          from your searches.
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <div className='flex flex-wrap bg-gray-100 p-6'>
          {intoleranceList}
          <span className='text-sm mt-2.5 -mb-4 ml-auto text-red-800'>
            Intolerances you wish to exclude from searches should be marked with
            an X!
          </span>
        </div>
      </Module.Container>
    </Module>
  );
};

export { IntolerancesModule };
