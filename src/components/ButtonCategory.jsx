const ButtonCategory = ({ setActiveFilter, activeFilter, category }) => {
  return (
    <>
      <section className="p-4">
        <div className="grid grid-cols-3 justify-center gap-1 mb-6">
          {category.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full transition-all 
                font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50  ${
                  activeFilter === cat
                    ? "bg-[#8A63D0] text-white focus:ring-[#6A5ACD]"
                    : "bg-[#E6D5FF] text-[#6A5ACD] hover:bg-[#D5C5FF] focus:ring-[#8A63D0]"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default ButtonCategory;
