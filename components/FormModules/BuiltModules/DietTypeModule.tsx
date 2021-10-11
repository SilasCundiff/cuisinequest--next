import Module from '../Module';
import { DietSelect } from '../../Select/DietSelect';
import { memo } from 'react';
const WrappedDietTypeModule = ({ diet, setUserDiet }) => {
  const handleChange = (e) => {
    setUserDiet(e.target.value);
  };

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Diet Type</Module.Heading>
        <Module.Paragraph>
          Feeling adventurous, but want to make sure your sticking to that diet
          trail?
        </Module.Paragraph>
        <Module.Paragraph>
          Select a diet type! Filter your searches to make sure you’re on the
          right track!
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <DietSelect diet={diet} handleChange={handleChange} />
      </Module.Container>
    </Module>
  );
};
const DietTypeModule = memo(WrappedDietTypeModule);
export { DietTypeModule };
