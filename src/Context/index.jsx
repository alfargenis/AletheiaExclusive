import { createContext, useEffect, useState } from 'react';
import { totalPrice } from '../utils';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  //Contador carrito
  const [count, setCount] = useState(0);

  // Detalles de productos - Abrir/Cerrar
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => {
    setIsProductDetailOpen(true);
  };
  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  //Detalles de Productos - Descripcion
  const [productToShow, setProductToShow] = useState({
    title: '',
    price: '',
    description: '',
    images: [],
  });

  //Carro de compras
  const [cartProducts, setCartProducts] = useState([]);

  // añadir productos al carro de compras
  const addProductToCart = (product) => {
    setCartProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((p) => p.id === product.id);
      let updatedProducts;
      if (productIndex >= 0) {
        updatedProducts = [...prevProducts];
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: (updatedProducts[productIndex].quantity || 0) + 1,
        };
      } else {
        updatedProducts = [...prevProducts, { ...product, quantity: 1 }];
      }
      setCount(updatedProducts.reduce((acc, curr) => acc + curr.quantity, 0)); // Actualiza el contador
      return updatedProducts;
    });
  };

  // incrementar cantidad de productos carro de compras

  const incrementProductQuantity = (productId) => {
    setCartProducts((prevProducts) => {
      return prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });
    setCount((prevCount) => prevCount + 1);
  };

  // reducir cantidad de productos carro de compras
  const decrementProductQuantity = (productId) => {
    setCartProducts((prevProducts) => {
      return prevProducts
        .map((product) => {
          if (product.id === productId) {
            const newQuantity = product.quantity > 1 ? product.quantity - 1 : 0;
            return { ...product, quantity: newQuantity };
          }
          return product;
        })
        .filter((product) => product.quantity > 0); // Eliminar productos con cantidad 0
    });

    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  //Elimina productos del carrito
  const removeProductFromCart = (productId) => {
    setCartProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );

      // Actualiza el contador basado en la nueva cantidad total en el carrito
      const newCount = updatedProducts.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      setCount(newCount);

      return updatedProducts;
    });
  };

  // Checkout Side Menu - Abrir/Cerrar
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => {
    setIsCheckoutSideMenuOpen(true);
  };
  const closeCheckoutSideMenu = () => {
    setIsCheckoutSideMenuOpen(false);
  };

  //Checkout generar orden
  const [order, setOrder] = useState([]);

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toISOString(),
      id: crypto.randomUUID().substring(0, 8),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
    };
    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setCount(0);
    setSearchInput(null);
    closeCheckoutSideMenu();
  };

  //GET PRODUCTS DE LA API
  const API = 'https://api.escuelajs.co/api/v1/products';

  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  // Buscador de productos
  const [searchInput, setSearchInput] = useState('');
  // Filtro de productos
  const [filteredItems, setFilteredItems] = useState([]);
  // Categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filtrar elementos por búsqueda y categoría seleccionada
  useEffect(() => {
    let updatedItems = items;

    // Filtrar por categoría si hay una seleccionada
    if (selectedCategory) {
      updatedItems = items.filter(
        (item) => item.category.name === selectedCategory
      );
    }

    // Filtrar por búsqueda si hay texto ingresado
    if (searchInput) {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    // Actualizar los items filtrados
    setFilteredItems(updatedItems);
  }, [items, searchInput, selectedCategory]);

  return (
    <CartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        addProductToCart,
        incrementProductQuantity,
        decrementProductQuantity,
        removeProductFromCart,
        order,
        setOrder,
        handleCheckout,
        items,
        setItems,
        searchInput,
        setSearchInput,
        filteredItems,
        setFilteredItems,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
