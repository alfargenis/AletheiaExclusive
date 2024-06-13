const OrdersCard = (props) => {
  const { date, id, totalProducts, totalPrice } = props;

  return (
    <div className='w-400 flex justify-between items-center mb-3 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'>
      <div className='flex flex-col items-center mr-4'>
        <span className='text-sm font-medium text-gray-600'>Orden ID </span>
        <span className='text-base font-semibold text-gray-800'>{id}</span>
      </div>
      <div className='flex flex-col items-center mr-4'>
        <span className='text-sm font-medium text-gray-600 '>
          Fecha de orden
        </span>
        <span className='text-base font-semibold text-gray-800'>{date}</span>
      </div>
      <div className='flex flex-col items-center mr-4'>
        <span className='text-sm font-medium text-gray-600'>
          Total productos
        </span>
        <span className='text-base font-semibold text-gray-800'>
          {totalProducts}
        </span>
      </div>

      <div className='flex flex-col items-center mr-4'>
        <span className='text-sm font-medium text-gray-600'>Total precio</span>
        <span className='text-lg font-semibold text-gray-800'>
          ${totalPrice}
        </span>
      </div>
    </div>
  );
};

export { OrdersCard };
