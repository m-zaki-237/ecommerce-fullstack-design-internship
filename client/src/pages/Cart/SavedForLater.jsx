import useCartStore from "../../store/cartStore";
import { formatPriceShort } from "../../utils/format";

const SavedForLater = () => {
  const { savedItems, moveToCart, removeSaved } = useCartStore();

  if (savedItems.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="section-title">Saved for later</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {savedItems.map((item) => (
          <div key={item.id} className="card overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-36 object-cover"
            />
            <div className="p-3">
              <p className="font-bold text-gray-800 mb-1">{formatPriceShort(item.price)}</p>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.name}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => moveToCart(item.id)}
                  className="flex-1 border border-blue-500 text-blue-500 rounded-lg py-1.5 text-xs font-medium hover:bg-blue-50 transition-colors"
                >
                  Move to cart
                </button>
                <button
                  onClick={() => removeSaved(item.id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedForLater;
