import { useState } from 'react';
import DashboardModule from './DashboardModule';
import { IntoleranceTypes } from '../../types';
import { Checkbox } from '../FormComponents/Checkbox';
import { StringCapitalizer } from '@/lib/helpers/StringCapitalizer';
const IntolerancesModule = ({ intolerances }) => {
  const [checkedIntolerances, setCheckedIntolerances] = useState(intolerances);

  function handleAvoidState(e, index) {
    const newIntolerances = [...checkedIntolerances];
    newIntolerances[index].avoid = e.target.checked;
    setCheckedIntolerances(newIntolerances);
  }

  const intoleranceList =
    checkedIntolerances &&
    checkedIntolerances.map((intolerance: IntoleranceTypes, index: number) => (
      <div key={intolerance.name}>
        <label
          className={`${
            intolerance.avoid ? 'text-red-500' : 'text-green-500'
          } text-2xl font-bold`}
        >
          <Checkbox
            checked={intolerance.avoid}
            onChange={(e) => handleAvoidState(e, index)}
          />
          {StringCapitalizer(intolerance.name)} {index}
        </label>
      </div>
    ));
  return (
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>
          Allergies and Intolerances
        </DashboardModule.Heading>
        <DashboardModule.Paragraph>
          We want everyone to have a safe journey. To make your quest a bit
          easier to navigate, we give you a way to filter by a list of
          intolerances.
        </DashboardModule.Paragraph>
        <DashboardModule.Paragraph>
          Select allergies and intolerances to exclude, and you can filter them
          from your searches.
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div className='grid grid-cols-3 list-none bg-gray-100'>
          {intoleranceList}
        </div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { IntolerancesModule };
