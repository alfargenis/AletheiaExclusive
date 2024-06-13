import { useContext } from 'react';
import { Card } from '../../Components/Card';
import { Layout } from '../../Components/Layout';
import { ProductDetail } from '../../ProductDetail';
import { CartContext } from '../../Context';

function Home() {
  const context = useContext(CartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {context.filteredItems.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      );
    } else {
      return (
        <div className='flex justify-center items-center h-full w-full'>
          <h2 className='text-xl font-semibold'>
            No se encontraron coincidencias de{' '}
            <span className='text-2xl font-semibold'>
              {context.searchInput}
            </span>
          </h2>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div>
        <h1 className='flex w-80 relative items-center justify-center mb-4 text-2xl font-semibold'>
          Aletheia Exclusive
        </h1>
      </div>
      <div className='flex justify-center mb-6'>
        <input
          type='text'
          placeholder='Buscar...'
          className='w-full max-w-lg px-20 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-400 transition duration-200 text-center'
          onChange={(event) => context.setSearchInput(event.target.value)}
        />
      </div>
      {renderView()}
      <ProductDetail />
    </Layout>
  );
}

export { Home };
