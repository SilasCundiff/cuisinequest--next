import styled from 'styled-components';
import { memo } from 'react';
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
const StyledCheckbox = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.checked ? 'rgb(239, 68, 68)' : 'rgba(16, 185, 129)'};
  border-radius: 3px;
  transition: all 150ms;
  margin-right: 8px;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(75, 85, 99);
  }
  & .icon-times {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
  & .icon-check {
    visibility: ${(props) => (props.checked ? 'hidden' : 'visible')};
  }

  ${({ hide }) => {
    return `${
      hide
        ? 'opacity: 0; visibility: hidden; width: 0px; height: 0;'
        : 'opacity: 1; visibility: show'
    }`;
  }}
`;

const CheckboxContainer = styled.div`
  display: inline-block;
`;

const Icon = styled.svg`
  fill: none;
  stroke: #fafafa;
  stroke-width: 2px;
`;

const WrappedCheckbox = ({
  className = null,
  checked,
  hide = false,
  ...props
}) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} hide={hide}>
      {checked ? (
        <Icon viewBox='0 0 24 24' className='icon-times'>
          <polyline points='21 3 3 21' />
          <polyline points='3 3 21 21' />
        </Icon>
      ) : (
        <Icon viewBox='0 0 24 24' className='icon-check'>
          <polyline points='20 6 9 17 4 12' />
        </Icon>
      )}
    </StyledCheckbox>
  </CheckboxContainer>
);

const Checkbox = memo(WrappedCheckbox);
export { Checkbox };
