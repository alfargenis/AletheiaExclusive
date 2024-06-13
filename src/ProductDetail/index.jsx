import { useContext } from 'react';
import './ProductDetail.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../Context';

const ProductDetail = () => {
  const context = useContext(CartContext);
  return (
    <aside
      className={`${
        context.isProductDetailOpen ? 'slide-in' : 'flex'
      } product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}
    >
      <div className='flex justify-between items-center p-3 border-b'>
        <h2 className='font-medium text-xl'>Detalles del producto</h2>
        <div>
          <XMarkIcon
            className='w-6 h-6 text-black cursor-pointer'
            onClick={() => context.closeProductDetail()}
          />
        </div>
      </div>
      <div className='p-6'>
        <figure className='border-b mb-4'>
          <img
            src={context.productToShow.images[0]}
            alt={context.productToShow.title}
            className='border rounded-lg'
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </figure>
        <div>
          <p className='text-3xl font-medium mb-2'>
            ${context.productToShow.price}
          </p>
          <p className='text-base font-medium mb-2'>
            {context.productToShow.title}
          </p>
          <p className='text-sm font-light mb-2'>
            {context.productToShow.description}
          </p>
        </div>
      </div>
    </aside>
  );
};

export { ProductDetail };
