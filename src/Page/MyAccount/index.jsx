import { useContext, useState, useRef } from 'react';
import { CartContext } from '../../Context';
import { Layout } from '../../Components/Layout';

function MyAccount() {
  const context = useContext(CartContext);
  const [view, setView] = useState('user-info');
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    //Actualizacion de datos
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem('account', stringifiedAccount);
    context.setAccount(data);
  };

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Nombre y Apellido: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => setView('edit-user-info')}
        >
          Editar
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => {
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
            defaultValue={parsedAccount.name}
            placeholder='Peter'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-light text-sm'>
            Tu correo:
          </label>
          <input
            type='text'
            id='email'
            name='email'
            defaultValue={parsedAccount.email}
            placeholder='hi@helloworld.com'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-light text-sm'>
            Tu contraseña:
          </label>
          <input
            type='text'
            id='password'
            name='password'
            defaultValue={parsedAccount.password}
            placeholder='******'
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={() => {
            setView('user-info'), editAccount();
          }}
        >
          Editar
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo();
  return (
    <Layout>
      {' '}
      <h1 className='font-medium text-xl text-center mb-6 w-80'>Mi cuenta</h1>
      {renderView()}
    </Layout>
  );
}

export { MyAccount };
