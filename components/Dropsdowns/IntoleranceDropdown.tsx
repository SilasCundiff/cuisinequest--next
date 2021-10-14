import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { StringCapitalizer } from '@/lib/helpers/StringCapitalizer';
import styled from 'styled-components';
const IntoleranceDropdown = ({ dropdownListItems, setListItemState }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(`dropdownListItems`, dropdownListItems);

  const dropDownList = useMemo(() => {
    return (
      dropdownListItems &&
      dropdownListItems.map((listItem, index) => {
        return (
          <div
            className={`ml-1 mr-3 my-2 h-6 flex items-center rounded ${
              listItem.avoid ? 'bg-red-400 text-gray-600' : 'bg-gray-100'
            }`}
            key={uuidv4()}
            onClick={(e) => setListItemState(e, index)}
          >
            <span
              className={`inline-block min-w-24 min-h-24 max-h-24 max-w-24 rounded mr-3 ${
                listItem.avoid ? 'bg-red-400' : 'bg-gray-300'
              }`}
            >
              {listItem.avoid ? (
                <Icon viewBox='0 0 24 24' className='icon-times'>
                  <polyline points='21 3 3 21' />
                  <polyline points='3 3 21 21' />
                </Icon>
              ) : null}
            </span>
            {StringCapitalizer(listItem.name)}
          </div>
        );
      })
    );
  }, [dropdownListItems]);

  return (
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className={`min-w-185 w-full bg-gray-50 border-gray-400 tracking-wider font-medium text-gray-400 rounded-md px-3 py-1 border flex flex-col cursor-pointer ${
        dropdownOpen ? 'min-h-200' : 'h-auto'
      }`}
    >
      <div className='mx-auto'>Intolerances</div>
      <div
        className={`max-w-full ${
          dropdownOpen
            ? 'min-h-160 overflow-y-scroll bg-gray-50'
            : 'min-h-0 overflow-hidden'
        }`}
      >
        {dropDownList}
      </div>
    </div>
  );
};

const Icon = styled.svg`
  fill: none;
  stroke: currentColor;
  stroke-width: 2px;
`;

export default IntoleranceDropdown;
