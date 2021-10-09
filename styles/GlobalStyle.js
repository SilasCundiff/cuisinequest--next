import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 &::-webkit-scrollbar {
    width: .5em;
    height:  .5em;
  }
  &::-webkit-scrollbar-track {
    background: rgba(156, 163, 175);
    border-radius: 100vw;
    margin-block: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(52, 211, 153);
    /* border: 0.25em solid hsl(120 75% 50% / 1); */
    border-radius: 100vw;
  }
@supports (scrollbar-color: rgba(52, 211, 153) rgba(156, 163, 175)) {
  * {
    scrollbar-color: rgba(52, 211, 153) rgba(156, 163, 175);
    scrollbar-width: thin;
  }
}
`;

export default GlobalStyle;
