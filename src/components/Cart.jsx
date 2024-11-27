/* eslint-disable react/prop-types */
import { Trash2, Plus, Minus } from "lucide-react";

const Cart = ({
  setIsCartOpen,
  isCartOpen,
  cart,
  updateQuantity,
  removeFromCart,
  calculateTotal,
  sendMessageToWhatsApp,
}) => {
  // const handleFinalCompra = () => {

  // }

  return (
    <>
      {isCartOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#6A5ACD]">Carrito</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#6A5ACD] hover:text-[#8A63D0]"
            >
              Cerrar
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío</p>
          ) : (
            <>
              {cart.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 pb-2 border-b"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-[#8A63D0]">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-[#E6D5FF] p-1 rounded-full"
                    >
                      <Minus size={16} className="text-[#6A5ACD]" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-[#E6D5FF] p-1 rounded-full"
                    >
                      <Plus size={16} className="text-[#6A5ACD]" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-bold">Total:</span>
                  <span className="text-[#8A63D0] font-bold">
                    ${calculateTotal()}
                  </span>
                </div>
                <button
                  className="w-full mt-4 bg-[#8A63D0] text-white 
                  py-2 rounded-full hover:bg-[#6A5ACD] 
                  transition-colors"
                  onClick={sendMessageToWhatsApp}
                >
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
