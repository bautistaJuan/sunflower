import { useState } from "react";
import Header from "./components/Header";
import Cart from "./components/Cart";
import ButtonCategory from "./components/ButtonCategory";
import { products } from "./products.js";
import Card from "./components/Card.jsx";
const category = ["todos", "aros", "Ebillas", "Piercing"];
const numWhatsApp = import.meta.env.VITE_WHATSAPP_NUMBER;

const App = () => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts =
    activeFilter === "todos"
      ? products
      : products.filter(p => p.category === activeFilter);

  const priceFormatter = price => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };
  // Finalizar Compra

  const sendMessageToWhatsApp = () => {
    if (cart.length === 0) {
      return "No hay productos en el carrito.";
    }

    let message = "🍒 Hola, me interesa comprar los siguientes productos:%0A";
    cart.forEach(item => {
      message += `• ${item.name} (Cantidad: ${
        item.quantity
      }) - ${priceFormatter(item.price)} ARS%0A`;
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    message += `%0ATotal: ${priceFormatter(total)} ARS`;
    const url = `https://wa.me/${numWhatsApp}?text=${message}`;
    window.open(url, "_blank");
  };

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
    <div className="bg-[#c236cf57] min-h-screen font-sans text-[#4A4A4A] relative">
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
        sendMessageToWhatsApp={sendMessageToWhatsApp}
      />

      <section className="p-4">
        <ButtonCategory
          category={category}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Productos */}
        <Card
          addToCart={addToCart}
          filteredProducts={filteredProducts}
          priceFormatter={priceFormatter}
        />
      </section>
    </div>
  );
};

export default App;
