import styled, { keyframes } from 'styled-components';

const spin = keyframes`
to {
      transform: rotate(360deg);
    }
`;

const StyledLoader = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 100%;
  border-top-color: rgb(16, 185, 129);
  animation: ${spin} 1s cubic-bezier(0.79, 0.14, 0.15, 0.86) infinite;
`;

const Loader = () => {
  return <StyledLoader></StyledLoader>;
};

export default Loader;
