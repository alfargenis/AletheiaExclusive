import { useContext } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import AletheiaIcon from '../../Assets/img/AletheiaIcon.png';
import { CartContext } from '../../Context';

const Navbar = () => {
  const activeStyle = 'underline underline-offset-4';
  const context = useContext(CartContext);

  const handleCategoryChange = (category) => {
    context.setSelectedCategory(category);
  };

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
      <ul className='flex justify-center gap-3'>
        <li className='flex items-center h-4'>
          <NavLink to='/'>
            <img
              src={AletheiaIcon}
              alt='Aletheia Logo'
              className='h-12 w-12'
              onClick={() => handleCategoryChange('')}
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('')}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/electronics'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('Electronics')}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/shoes'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('Shoes')}
          >
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/furniture'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('Furniture')}
          >
            Furniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/miscellaneous'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('Miscellaneous')}
          >
            Miscellaneous
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/clothes'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleCategoryChange('Clothes')}
          >
            Clothes
          </NavLink>
        </li>
      </ul>
      <ul className='flex justify-center gap-3'>
        <li className='text-black/60'>aletheiaexclusive@gmail.com</li>
        <li>
          <NavLink
            to='/my-orders'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Mis Ordenes
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/my-account'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Mi Cuenta
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/sign-in'
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Iniciar Sesion
          </NavLink>
        </li>
        <li className='flex gap-2'>
          <ShoppingBagIcon className='w-5 h-5 text-black' />
          <div className='text-black text-base'>{context.count}</div>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
