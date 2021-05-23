import { getRandomString } from 'common/utils/string';
import { Link } from 'react-router-dom';

/* eslint-disable prettier/prettier */
export const Menu = ({
  menuList
}) => (
  <nav>
    {
      menuList.map((menuItem) => <Link key={getRandomString()} to={ menuItem.link }>{ menuItem.title }</Link>)
    }
  </nav>
);