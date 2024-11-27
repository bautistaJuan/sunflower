import PropTypes from "prop-types";
const Card = ({ filteredProducts, priceFormatter, addToCart }) => {
  return (
    <>
      <div className="grid grid-cols-2  gap-3 md:grid-cols-5">
        {filteredProducts.map(producto => (
          <div
            key={producto.id}
            className="bg-white rounded-lg shadow-md  text-center 
                hover:shadow-xl transition-all transform hover:scale-105 min-h-[18.5rem]"
          >
            <img
              src={producto.image}
              alt={producto.name}
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="font-bold text-[#4A4A4A]">{producto.name}</h3>
            <p className="text-[#ca40b3] font-semibold">
              {priceFormatter(producto.price)}
            </p>
            <button
              onClick={() => addToCart(producto)}
              className="absolute bottom-3 left-3 right-3  font-semibold bg-[#f12897f5] text-[#ffffff] 
                px-1 py-2 rounded-lg hover:bg-[#ca31c277] 
                hover:text-white transition-colors
                "
            >
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
Card.propTypes = {
  filteredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  priceFormatter: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};
export default Card;
