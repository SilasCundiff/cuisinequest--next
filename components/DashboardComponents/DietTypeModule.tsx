import { useState } from 'react';
import DashboardModule from './DashboardModule';
import { DietSelect } from '../Select/DietSelect';
const DietTypeModule = ({ diet, setDashboardDiet }) => {
  const handleChange = (e) => {
    setDashboardDiet(e.target.value);
  };

  return (
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>Diet Type</DashboardModule.Heading>
        <DashboardModule.Paragraph>
          Feeling adventurous, but want to make sure your sticking to that diet
          trail?
        </DashboardModule.Paragraph>
        <DashboardModule.Paragraph>
          Select a diet type! Filter your searches to make sure you’re on the
          right track!
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <DietSelect diet={diet} handleChange={handleChange} />
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { DietTypeModule };
