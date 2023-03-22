import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarStyled = styled.nav`
  ul {
    display: flex;
    gap: var(--spacing-1);
  }
  a {
    padding: var(--spacing-0-5) var(--spacing-1);
    border-radius: 20px;
  }
  .active {
    background-color: var(--color-highlight-primary);
    color: var(--color-bg);
  }
`;

const NavBar = ({ links }) => {
  return (
    <NavBarStyled links={links}>
      <ul>
        {links.map((item) => (
          <li key={item.name}>
            <NavLink to={item.link}>{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </NavBarStyled>
  );
};

export default NavBar;
