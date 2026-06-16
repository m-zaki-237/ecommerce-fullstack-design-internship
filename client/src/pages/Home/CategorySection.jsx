const CategorySection = ({ title, bgImage, items }) => (
  <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white">
    {/* Category banner */}
    <div
      className="md:w-44 p-4 relative shrink-0 min-h-[160px] flex flex-col justify-end"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="relative z-10">
        <h2 className="font-semibold text-white text-base mb-2 leading-snug">{title}</h2>
        <button className="bg-white text-gray-800 text-xs px-3 py-1.5 rounded font-medium hover:bg-gray-100 transition-colors">
          Source now
        </button>
      </div>
    </div>

    {/* Product grid */}
    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-0">
      {items.map((item) => (
        <button
          key={item.id}
          className="flex flex-col items-center border-r border-b border-gray-100 last:border-r-0 p-3 hover:bg-gray-50 transition-colors"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg mb-2"
          />
          <p className="text-xs text-center text-gray-600 mb-0.5 leading-tight">{item.name}</p>
          <p className="text-xs text-gray-400">From {item.price}</p>
        </button>
      ))}
    </div>
  </div>
);

export default CategorySection;
