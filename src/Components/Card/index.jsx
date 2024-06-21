import { useContext } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../../Context';
const Card = (data) => {
  const context = useContext(CartContext);

  const showProduct = (productDetail) => {
    context.openProductDetail();
    context.setProductToShow(productDetail);
    context.closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    // context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
    context.closeProductDetail();
    context.addProductToCart(productData);
  };

  const renderIcon = (id) => {
    const isInCart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isInCart) {
      return (
        <div className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 py-1 px-0.5'>
          <CheckIcon className='h-6 w-6 text-white'></CheckIcon>
        </div>
      );
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 py-1 px-0.5'
          onClick={(event) => addProductsToCart(event, data.data)}
        >
          <PlusIcon className='w-4 h-4 text-black' />
        </div>
      );
    }
  };

  return (
    <div
      className='bg-white cursor-pointer w-56 h-60 rounded-lg'
      onClick={() => showProduct(data.data)}
    >
      <figure className='relative mb-2 w-full h-4/5'>
        <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 p-1'>
          {data.data.category.name}
        </span>
        <img
          className='w-full h-full object-cover rounded-lg'
          src={data.data.images}
          alt={data.data.title}
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className='flex justify-between items-center'>
        <span className='text-sm font-light'>{data.data.title}</span>
        <span className='text-lg font-medium'>${data.data.price}</span>
      </p>
    </div>
  );
};

export { Card };
