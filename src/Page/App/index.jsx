import { useRoutes, BrowserRouter } from 'react-router-dom';
import { CartContextProvider } from '../../Context';
import { Home } from '../Home';
import { MyAccount } from '../MyAccount';
import { MyOrder } from '../MyOrder';
import { MyOrders } from '../MyOrders';
import { NotFound } from '../NotFound';
import { SignIn } from '../SignIn';
import { Navbar } from '../../Components/Navbar';
import { CheckoutSideMenu } from '../../Components/CheckoutSideMenu';
import './App.css';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/shoes', element: <Home /> },
    { path: '/furniture', element: <Home /> },
    { path: '/miscellaneous', element: <Home /> },
    { path: '/clothes', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/:orderId', element: <MyOrder /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/*', element: <NotFound /> },
    { path: '/sign-in', element: <SignIn /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <CartContextProvider>
      <BrowserRouter basename='/AletheiaExclusive'>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </CartContextProvider>
  );
};

export { App };
