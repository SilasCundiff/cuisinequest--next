import DashboardModule from './DashboardModule';

const DietTypeModule = ({ diet }) => {
  return (
    <DashboardModule>
      <DashboardModule.Container>
        <DashboardModule.Heading>Diet Type</DashboardModule.Heading>
        <DashboardModule.Paragraph>
          Feeling adventurous, but want to make sure your sticking to that diet
          trail? Select a diet type! Filter your searches to make sure you’re on
          the right track!
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div>{diet}</div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { DietTypeModule };
