import { useContext } from 'react';
import { Layout } from '../../Components/Layout';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../Context';
import { OrderCard } from '../../Components/OrderCard';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';

function MyOrder() {
  const context = useContext(CartContext);
  let { orderId } = useParams();
  const index =
    orderId === undefined ? context.order.length - 1 : parseInt(orderId);
  const order = context.order[index];
  return (
    <Layout>
      <div className='flex w-80 relative items-center justify-center mb-4'>
        <Link to='/my-orders' className='absolute left-0 z-10'>
          <ChevronLeftIcon className='h-8 w-8 text-black cursor-pointer'></ChevronLeftIcon>
        </Link>
        <h1 className='flex w-80 relative items-center justify-center'>
          Mi Orden
        </h1>
      </div>
      <div className='flex flex-col w-100 px-8 '>
        {order.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imgUrl={product.images}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    </Layout>
  );
}

export { MyOrder };
