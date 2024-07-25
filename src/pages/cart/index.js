import { addCartItem, deleteCartItem, removeCartItem } from '@/redux/cart.slice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveItem = (id) => {
        dispatch(deleteCartItem(id));
    };

    const onAdd = (id) => {
        dispatch(addCartItem(id));
    };
    
    const onDel = (id) => {
        dispatch(removeCartItem(id));
    };
    
    return (
        <div className="flex w-[1320px] flex-col m-auto flex-wrap gap-[24px]">
            <div className='flex justify-between'>
                <div className='flex items-end gap-5'>
                    <h2 className='text-4xl font-bold '>Cart</h2>
                    <p>{cartItems.length}  Product</p>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 items-center bg-white p-4 justify-between ">
                        <img src={item.image} alt={item.title} className="w-64 h-64 object-cover mb-4" />
                        <div>
                            <p className="text-lg font-bold mb-2">{item.description}</p>
                            <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                            <p className="text-gray-600 mb-2">Count: {item.quantity}</p>
                            {cartItems.some((el) => el.id === item.id) ? (
                                <div className="flex items-center w-[120px] p-1 rounded-md justify-between border">
                                    <button
                                        onClick={() => onDel(item.id)}
                                        className="text-4xl font-bold"
                                    >
                                        -
                                    </button>
                                    <p className="text-2xl">
                                        {item.quantity}
                                    </p>
                                    <button
                                        onClick={() => onAdd(item)}
                                        className="text-4xl font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => onAdd(item)}
                                    className="p-2 rounded-md bg-yellow-400"
                                >
                                    <i className="fa-solid fa-cart-arrow-down"></i> В корзину
                                </button>
                            )}
                        </div>
                        <div className='h-full flex flex-col justify-between'>

                        <button onClick={() => handleRemoveItem(item.id)} className="text-gray-500 flex text-sm"><DeleteIcon/>Удалить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
