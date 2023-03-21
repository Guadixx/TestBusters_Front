import { createGlobalStyle } from 'styled-components';

import Palette from './Palette';
const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    font-family: 'Figtree', sans-serif;
    color: ${Palette.color_primary};
    scroll-behavior: smooth;
    }
    button,
    a {
     cursor: pointer;
    }
`;
export default GlobalStyle;
