import DashboardModule from './DashboardModule';

const DietTypeModule = ({ diet }) => {
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
        <select className='text-gray-600 text-4xl' value={diet}>
          <option value='keto'>keto</option>
          <option value='vegan'>vegan</option>
          <option value='carnivore'>carnivore</option>
          <option value='whole30'>whole30</option>
          <option value='pizza'>pizza</option>
        </select>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { DietTypeModule };
