import './Footer.css';

import { NavLink } from 'react-router-dom';

import Icons from '../styles/Icons';
import Palette from '../styles/Palette';
import { Heading_4 } from '../ui/Headings';

const Footer = () => {
  return (
    <section className="footer">
      <div className="social-icons">
        <ul>
          <li>
            <a href="mailto:testbusters2023@gmail.com">
              <img src={Icons.email} alt="email icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Guadixx/TestBusters_Front">
              <img src={Icons.github} alt="github icon" />
            </a>
          </li>
          <li>
            <a href="https://stellar-coaster-017.notion.site/TESTBUSTERS-3a2422fe9d944563b25f491321044bc4">
              <img src={Icons.notion} alt="notion icon" />
            </a>
          </li>
        </ul>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/test">Tests</NavLink>
          </li>
          <li>
            <NavLink to="/community">Community</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
        </ul>
      </nav>
      <span></span>
      <div className="footer-legal">
        <ul>
          <li>
            <NavLink to="/legaladvice">Legal Advice</NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink to="/privacy">Privacy Policy</NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink to="/cookies">Cookies Policy</NavLink>
          </li>
        </ul>
      </div>
      <Heading_4
        size="12px "
        color={Palette.color_secundary}
        text=" © Copyright 2023 TestBusters, SA."
      />
    </section>
  );
};

export default Footer;
