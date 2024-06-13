import { XCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/16/solid';
const OrderCard = (props) => {
  const { title, imgUrl, price, quantity, onIncrement, onDecrement, onRemove } =
    props;
  let renderXMarkIcon;
  if (onRemove) {
    renderXMarkIcon = (
      <XCircleIcon
        className='w-5 h-5 text-black cursor-pointer hover:text-red-600'
        onClick={onRemove}
      />
    );
  }
  let renderIncrement;
  if (onIncrement) {
    renderIncrement = (
      <div className='flex items-center gap-1 justify-center border border-black rounded-lg'>
        <button
          onClick={onDecrement}
          className='text-sm font-medium ml-1 mb-3 hover:text-red-600'
        >
          _
        </button>
        <p className='text-xs font-medium mr-1 ml-1'>{quantity || 0}</p>
        <button onClick={onIncrement}>
          <PlusIcon className='w-4 h-4 text-black hover:text-green-600' />
        </button>
      </div>
    );
  }
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-4 mb-2 p-1'>
        <figure className='w-20 h-20'>
          <img
            className='w-full h-full rounded-lg object-cover'
            src={imgUrl}
            alt={title}
          />
        </figure>
        <p className='text-xs font-light '>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        {renderIncrement}
        <p className='text-sm font-medium ml-4'>${price * quantity}</p>
        {renderXMarkIcon}
      </div>
    </div>
  );
};

export { OrderCard };
