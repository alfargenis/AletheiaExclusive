import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../Components/Layout';
import { OrdersCard } from '../../Components/OrdersCard';
import { CartContext } from '../../Context';
function MyOrders() {
  const context = useContext(CartContext);
  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <h1 className='flex w-80 relative items-center justify-center mb-4'>
        Mis ordenes
      </h1>
      {context.order.map((order, index) => (
        <Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard
            key={order.id}
            date={formatDate(order.date)}
            id={order.id}
            totalProducts={order.totalProducts}
            totalPrice={order.totalPrice}
            order={index + 1}
          />
        </Link>
      ))}
    </Layout>
  );
}

export { MyOrders };
