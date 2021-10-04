import DashboardModule from './DashboardModule';
import { IntoleranceTypes } from '../../types';
const IntolerancesModule = ({ intolerances }) => {
  const intoleranceList =
    intolerances &&
    intolerances.map((intolerance: IntoleranceTypes) => (
      <li
        className={`${intolerance.avoid ? 'text-red-500' : 'text-gray-700'}`}
        key={intolerance.name}
      >
        {intolerance.name}
      </li>
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
          intolerances. Select allergies and intolerances to exclude, and you
          can filter them from your searches.
        </DashboardModule.Paragraph>
      </DashboardModule.Container>
      <DashboardModule.Container>
        <div>{intoleranceList}</div>
      </DashboardModule.Container>
    </DashboardModule>
  );
};

export { IntolerancesModule };
