import { ShoppingCart, Heart } from "lucide-react";

const Header = ({ cart, setIsCartOpen, isCartOpen }) => {
  return (
    <header className="bg-[#ca308f60] p-4 shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold text-[#ffffff] tracking-wide">
        Cherry 🍒 <br />
        Accesorios
      </div>
      <div className="flex space-x-4 relative">
        <div className="relative">
          <ShoppingCart
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="text-[#6A5ACD] hover:text-[#8A63D0] 
              transition-colors cursor-pointer"
            size={24}
          />
          {cart.length > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-[#c763d0] 
              text-white rounded-full w-5 h-5 flex items-center 
              justify-center text-xs"
            >
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </div>
        <Heart
          className="text-[#6A5ACD] hover:text-[#FF69B4] 
            transition-colors cursor-pointer"
          size={24}
        />
      </div>
    </header>
  );
};

export default Header;
