import { useContext, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';

function SignIn() {
  const context = useContext(CartContext);
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  //Account
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);

  //Has an account

  const noAccountInLocalStorage = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const noAccountInLocalState = context.account
    ? Object.keys(context.account).length === 0
    : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false);
    localStorage.setItem('sign-out', stringifiedSignOut);
    context.setSignOut(false);
    return <Navigate replace to={'/'} />;
  };
  // Create Account
  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);
    //Sign in
    handleSignIn();
  };

  const renderLogin = () => {
    return (
      <div className='flex flex-col w-90 justify-start'>
        <p className='flex items-baseline'>
          <span className='font-light text-sm w-24'>Correo electrónico:</span>
          <span>{parsedAccount?.email || 'Sin datos registrados'}</span>
        </p>
        <p className='flex items-baseline'>
          <span className='font-light text-sm w-24'>Contraseña:</span>
          <span>{parsedAccount?.password || 'Sin datos registrados'}</span>
        </p>
        <Link to='/'>
          <button
            className={`bg-black text-white w-full rounded-lg py-3 mt-4 mb-2 ${
              !hasUserAnAccount ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handleSignIn()}
            disabled={!hasUserAnAccount}
          >
            Iniciar sesión
          </button>
        </Link>
        <div className='text-center'>
          <a
            className='font-light text-xs underline underline-offset-4'
            href='/'
          >
            Olvidé mi contraseña
          </a>
        </div>
        <button
          className={`border border-black w-full rounded-lg mt-6 py-3 ${
            hasUserAnAccount ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => setView('create-user-info')}
          disabled={hasUserAnAccount}
        >
          Registrarse
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='name' className='font-light text-sm'>
            Nombre y Apellido:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            defaultValue={parsedAccount?.name}
            placeholder='Ej: Juan Pérez'
            className='rounded-lg border border-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>
            Correo electrónico:
          </label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount?.email}
            placeholder='Ej: juanperez@gmial.com'
            className='rounded-lg border border-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-light text-sm'>
            Contraseña:
          </label>
          <input
            type='text'
            id='password'
            name='password'
            defaultValue={parsedAccount?.password}
            placeholder='**************'
            className='rounded-lg border border-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to='/'>
          <button
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}
          >
            {' '}
            Crear Cuenta
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === 'create-user-info' ? renderCreateUserInfo() : renderLogin();

  return (
    <Layout>
      <h1 className='font-medium text-xl text-center mb-6 w-80'>
        Bienvenido/a a tu tienda Exclusiva
      </h1>
      {renderView()}
    </Layout>
  );
}

export { SignIn };
