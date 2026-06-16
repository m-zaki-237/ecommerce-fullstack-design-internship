import useCartStore from "../../store/cartStore";
import { formatPriceShort } from "../../utils/format";

const CartItem = ({ item }) => {
  const { updateQty, removeItem, saveForLater } = useCartStore();

  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 last:border-b-0">
      <img
        src={item.img}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug">{item.name}</h3>
        <p className="text-xs text-gray-400 mb-0.5">
          Size: {item.size}, Color: {item.color}, Material: Plastic
        </p>
        <p className="text-xs text-gray-400 mb-2">Seller: {item.seller}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => removeItem(item.id)}
            className="text-xs text-blue-500 hover:text-red-500 transition-colors"
          >
            Remove
          </button>
          <button
            onClick={() => saveForLater(item.id)}
            className="text-xs text-blue-500 hover:underline transition-colors"
          >
            Save for later
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 shrink-0">
        <p className="font-bold text-gray-800">{formatPriceShort(item.price)}</p>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => updateQty(item.id, -1)}
            className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            −
          </button>
          <span className="px-3 text-sm font-medium border-x border-gray-200">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, 1)}
            className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
