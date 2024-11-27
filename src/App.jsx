import { useState } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ButtonCategory from "./components/ButtonCategory";
import { products } from "./products";

const category = ["todos", "aros", "anillos", "collares", "Utencilios"];

const App = () => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    activeFilter === "todos"
      ? products
      : products.filter(p => p.category === activeFilter);

  // Cart Logica
  const addToCart = product => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = productId => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  // Component
  return (
    <div className="bg-[#F0E6FF] min-h-screen font-sans text-[#4A4A4A] relative">
      {/* Header */}
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isCartOpen={isCartOpen}
      />
      {/* Carrito Modal */}
      <Cart
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        calculateTotal={calculateTotal}
      />

      <section className="p-4">
        <ButtonCategory
          category={category}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Productos */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filteredProducts.map(producto => (
            <div
              key={producto.id}
              className="bg-white rounded-lg shadow-md p-4 text-center 
                hover:shadow-xl transition-all transform hover:scale-105"
            >
              <img
                src={producto.image}
                alt={producto.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-[#4A4A4A]">{producto.name}</h3>
              <p className="text-[#8A63D0] font-semibold">${producto.price}</p>
              <button
                onClick={() => addToCart(producto)}
                className="mt-2 bg-[#E6D5FF] text-[#6A5ACD] 
                px-4 py-2 rounded-full hover:bg-[#8A63D0] 
                hover:text-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] 
                focus:ring-opacity-50"
              >
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
