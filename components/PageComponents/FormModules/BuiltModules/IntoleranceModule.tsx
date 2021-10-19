import { memo, useCallback, useMemo } from 'react';
import Module from '@/components/PageComponents/FormModules/Module';
import { Checkbox } from '@/components/ReusableComponents/Checkbox';
import { stringCapitalizer } from '@/lib/helpers';
import { initialIntolerance } from '@/lib/initialIntoleranceState';
import { IntoleranceTypes } from '@/types/';

const WrappedIntoleranceModule = (props) => {
  const { userIntolerance = initialIntolerance, setUserIntolerance } = props;

  const handleAvoidState = useCallback(
    (e, index: number) => {
      const newIntolerance = [...userIntolerance];
      newIntolerance[index].avoid = e.target.checked;
      setUserIntolerance(newIntolerance);
    },
    [setUserIntolerance, userIntolerance]
  );

  const intoleranceList = useMemo(() => {
    return (
      userIntolerance &&
      userIntolerance.map((intolerance: IntoleranceTypes, index: number) => (
        <div key={intolerance.name} className='mx-auto my-6 min-w-1/4 flex'>
          <label
            className={`${
              intolerance.avoid ? 'text-red-500' : 'text-green-500'
            } text-3xl font-bold ml-12 mr-auto cursor-pointer`}
          >
            <Checkbox className='mr-1' checked={intolerance.avoid} onChange={(e) => handleAvoidState(e, index)} />
            {stringCapitalizer(intolerance.name)}
          </label>
        </div>
      ))
    );
  }, [userIntolerance, handleAvoidState]);

  return (
    <Module>
      <Module.Container>
        <Module.Heading>Allergies and intolerance</Module.Heading>
        <Module.Paragraph>
          We want everyone to have a safe journey. To make your quest a bit easier to navigate, we give you a way to
          filter by a list of intolerance.
        </Module.Paragraph>
        <Module.Paragraph>
          Select allergies and intolerance to exclude, and you can filter them from your searches.
        </Module.Paragraph>
      </Module.Container>
      <Module.Container>
        <div className='flex flex-wrap bg-gray-100 p-6'>
          {intoleranceList}
          <span className='text-sm mt-2.5 -mb-4 ml-auto text-red-800'>
            Any intolerance you wish to exclude from searches should be marked with an X!
          </span>
        </div>
      </Module.Container>
    </Module>
  );
};

const IntoleranceModule = memo(WrappedIntoleranceModule, (prevProps, nextProps) => {
  if (prevProps.userIntolerance !== nextProps.userIntolerance) return false;
  return true;
});

export { IntoleranceModule };
