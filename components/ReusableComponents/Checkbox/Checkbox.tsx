import { memo } from 'react';
import styled from 'styled-components';

type CheckboxProps = {
  checked: boolean;
  emptyToCheck?: boolean;
};

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
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
  background: ${({ checked, emptyToCheck }: CheckboxProps) => {
    if (emptyToCheck) {
      return checked ? 'rgb(155, 155, 155)' : 'rgb(16, 185, 129)';
    }
    if (!emptyToCheck) {
      return checked ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)';
    }
  }};

  border-radius: 3px;
  transition: all 150ms;
  margin-right: 8px;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgb(75, 85, 99);
  }
  & .icon-times {
    visibility: ${({ checked }: CheckboxProps) => (checked ? 'visible' : 'hidden')};
  }
  & .icon-check {
    visibility: ${({ checked, emptyToCheck }: CheckboxProps) => {
      if (emptyToCheck) {
        return checked ? 'visible' : 'visible';
      } else {
        return checked ? 'hidden' : 'visible';
      }
    }};
  }

  ${({ hide }: any) => {
    return `${hide ? 'opacity: 0; visibility: hidden; width: 0px; height: 0;' : 'opacity: 1; visibility: show'}`;
  }}
`;

const CheckboxContainer = styled.div`
  display: ${({ inline }: { inline: boolean }) => (inline ? 'inline-block' : 'flex')};
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
  emptyToCheck = false,
  inline = true,
  ...props
}) => (
  <CheckboxContainer className={className} inline={inline}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked} hide={hide} emptyToCheck={emptyToCheck}>
      {!emptyToCheck &&
        (checked ? (
          <Icon viewBox='0 0 24 24' className='icon-times'>
            <polyline points='21 3 3 21' />
            <polyline points='3 3 21 21' />
          </Icon>
        ) : (
          <Icon viewBox='0 0 24 24' className='icon-check'>
            <polyline points='20 6 9 17 4 12' />
          </Icon>
        ))}
      {emptyToCheck && checked ? null : (
        <Icon viewBox='0 0 24 24' className='icon-check'>
          <polyline points='20 6 9 17 4 12' />
        </Icon>
      )}
    </StyledCheckbox>
  </CheckboxContainer>
);

const Checkbox = memo(WrappedCheckbox);
export { Checkbox };
