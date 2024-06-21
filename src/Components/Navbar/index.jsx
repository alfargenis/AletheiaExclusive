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

  const signOut = localStorage.getItem('sign-out');
  const parsedSignOut = JSON.parse(signOut);
  const isUserSignOut = context.signOut || parsedSignOut;

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(true);
  };

  const getAccountEmail = () => {
    const account = localStorage.getItem('account');
    if (account) {
      const parsedAccount = JSON.parse(account);
      return parsedAccount.email;
    }
    return null;
  };
  const renderView = () => {
    if (isUserSignOut) {
      return (
        <>
          <li>
            <NavLink
              to='/sign-in'
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Iniciar Sesion
            </NavLink>
          </li>
          <nav className='relative flex gap-0.5 items-center'>
            <ul>
              <li className='flex gap-2'>
                <ShoppingBagIcon
                  className='w-5 h-5 text-black cursor-pointer'
                  onClick={context.openCheckoutSideMenu}
                />
                <div className='absolute bottom-3 left-3 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white'>
                  {context.count}
                </div>
              </li>
            </ul>
            {context.isCheckoutSideMenuOpen}
          </nav>
        </>
      );
    } else {
      return (
        <>
          <li className='text-black/60'>{getAccountEmail()}</li>
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
              onClick={() => handleSignOut()}
            >
              Cerrar Sesion
            </NavLink>
          </li>
          <nav className='relative flex gap-0.5 items-center'>
            <ul>
              <li className='flex gap-2'>
                <ShoppingBagIcon
                  className='w-5 h-5 text-black cursor-pointer'
                  onClick={context.openCheckoutSideMenu}
                />
                <div className='absolute bottom-3 left-3 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white'>
                  {context.count}
                </div>
              </li>
            </ul>
            {context.isCheckoutSideMenuOpen}
          </nav>
        </>
      );
    }
  };

  return (
    <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
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
      <ul className='flex justify-center gap-3'>{renderView()}</ul>
    </nav>
  );
};

export { Navbar };
