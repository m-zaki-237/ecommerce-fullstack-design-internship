import { RECOMMENDED_ITEMS } from "../../data/products";
import { formatPriceShort } from "../../utils/format";

const RecommendedItems = () => (
  <section>
    <h2 className="section-title">Recommended items</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {RECOMMENDED_ITEMS.map((item) => (
        <button
          key={item.id}
          className="card p-3 hover:shadow-md hover:border-blue-200 transition-all group text-left"
        >
          <div className="relative mb-3">
            <img
              src={item.img}
              alt={item.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            <span className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-sm">
              🤍
            </span>
          </div>
          <p className="font-semibold text-gray-800 text-sm">{formatPriceShort(item.price)}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-tight line-clamp-2">{item.name}</p>
        </button>
      ))}
    </div>
  </section>
);

export default RecommendedItems;
