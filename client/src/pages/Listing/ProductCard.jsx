import { Link } from "react-router-dom";
import StarRating from "../../components/ui/StarRating";
import { formatPriceShort } from "../../utils/format";

const ProductCard = ({ product, viewMode }) => {
  if (viewMode === "list") {
    return (
      <Link
        to="/product"
        className="card p-4 flex gap-4 hover:shadow-md hover:border-blue-200 transition-all block"
      >
        <img
          src={product.img}
          alt={product.name}
          className="w-36 h-36 object-cover rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-base mb-2 leading-snug">{product.name}</h3>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-red-500 font-bold text-lg">{formatPriceShort(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm line-through">
                {formatPriceShort(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <StarRating score={product.rating} />
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">{product.orders} orders</span>
            <span className="text-green-500 text-sm font-medium">{product.shipping}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <span className="link-blue mt-2 inline-block">View details</span>
        </div>
        <button
          className="text-gray-300 hover:text-red-400 text-xl shrink-0 self-start"
          onClick={(e) => e.preventDefault()}
        >
          🤍
        </button>
      </Link>
    );
  }

  return (
    <Link
      to="/product"
      className="card overflow-hidden hover:shadow-md hover:border-blue-200 transition-all group block"
    >
      <div className="relative">
        <img
          src={product.img}
          alt={product.name}
          className="w-full aspect-square object-cover"
        />
        <button
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          onClick={(e) => e.preventDefault()}
        >
          🤍
        </button>
      </div>
      <div className="p-3">
        <p className="font-bold text-red-500 text-base">{formatPriceShort(product.price)}</p>
        {product.originalPrice && (
          <p className="text-gray-400 text-xs line-through">{formatPriceShort(product.originalPrice)}</p>
        )}
        <StarRating score={product.rating} />
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.name}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
