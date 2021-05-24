/* eslint-disable prettier/prettier */

import { Logo } from 'common/components/Logo/Logo';
import { Menu } from 'common/components/Menu/Menu';
import { menuData } from '../../data';
import './styles.css';

export const AppLayout = ({ children }) => (
  <>
    <header className="header">
      <div className="container padding-8">
        <div className="header__logo">
          <Logo />
        </div>
        <Menu menuList={menuData} />
        <div className="header__menu">
          <div className="icon__account">
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 9.11107 13.0655 11.0039 11.5876 12.2873C11.3503 12.4934 11 12.3143 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 12.3143 2.64971 12.4934 2.41242 12.2873C0.93451 11.0039 0 9.11107 0 7ZM7 3C5.89543 3 5 3.89543 5 5C5 6.10457 5.89543 7 7 7C8.10457 7 9 6.10457 9 5C9 3.89543 8.10457 3 7 3Z"
                fill="#4B4B7C"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <main className="page__content">
      <div className="container">{children}</div>
    </main>
  </>
);
