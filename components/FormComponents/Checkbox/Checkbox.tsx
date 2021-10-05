import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? 'salmon' : 'rgb(243, 244, 246)')};
  border-radius: 3px;
  transition: all 150ms;
  margin-right: 8px;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  & .icon {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
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
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const Checkbox = ({
  className = null,
  checked,
  hide = false,
  ...props
}) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} hide={hide}>
      <Icon viewBox='0 0 24 24' className='icon'>
        <polyline points='20 6 9 17 4 12' />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);
