import styled from 'styled-components';

import Palette from '../styles/Palette';

const SpinnerDivStyled = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #cef;
    border-color: ${Palette.color_highlight_primary} transparent
      ${Palette.color_highlight_primary} transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return <SpinnerDivStyled></SpinnerDivStyled>;
};
export default Spinner;
