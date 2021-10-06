import { useState, useEffect } from 'react';
import DashboardModule from './DashboardModule';
import { IntoleranceTypes } from '../../types';
import { Checkbox } from '../FormComponents/Checkbox';
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
  const { dashboardIntolerances, setDashboardIntolerances } = props;
  console.log('dashboardIntolerances :>> ', dashboardIntolerances);
  const handleAvoidState = (e, index: number) => {
    const newIntolerances = [...dashboardIntolerances];
    newIntolerances[index].avoid = e.target.checked;
    setDashboardIntolerances(newIntolerances);
  };

  const intoleranceList =
    dashboardIntolerances &&
    dashboardIntolerances.map(
      (intolerance: IntoleranceTypes, index: number) => (
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
      )
    );

  console.log('intolerancesList :>> ', dashboardIntolerances);

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
        <div className='flex flex-wrap bg-gray-100 p-6'>{intoleranceList}</div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { IntolerancesModule };
