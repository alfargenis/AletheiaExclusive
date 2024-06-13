import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../Context';
import { OrderCard } from '../OrderCard';
import { totalPrice } from '../../utils';

const CheckoutSideMenu = () => {
  const context = useContext(CartContext);
  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? 'slide-in' : 'flex'
      } checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-3 border-b'>
        <h2 className='font-medium text-xl'>Mi orden</h2>
        <div>
          <XMarkIcon
            className='w-6 h-6 text-black cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}
          />
        </div>
      </div>
      <div className='px-2 flex-1 overflow-y-scroll'>
        {context.cartProducts.map((product, index) => (
          <OrderCard
            key={`${product.id}-${index}`}
            title={product.title}
            imgUrl={product.images}
            price={product.price}
            quantity={product.quantity}
            onIncrement={() => context.incrementProductQuantity(product.id)}
            onDecrement={() => context.decrementProductQuantity(product.id)}
            onRemove={() => context.removeProductFromCart(product.id)}
          />
        ))}
      </div>
      <div className='px-8 p-2 border-t'>
        <p className='flex justify-between items-center mb-2'>
          <span className='font-light'>Total orden:</span>
          <span className='font-medium text-2xl'>
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to='/my-orders/last'>
          <button
            className='w-full bg-black py-3 text-white rounded-lg'
            onClick={context.handleCheckout}
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export { CheckoutSideMenu };
