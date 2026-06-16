import StarRating from "../../components/ui/StarRating";
import { formatPriceShort } from "../../utils/format";

const TIER_STYLES = [
  "bg-red-500 text-white",
  "bg-orange-100 text-orange-700",
  "bg-orange-50 text-orange-600",
];

const ProductInfo = ({ product }) => (
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-green-500 text-sm font-medium flex items-center gap-1">
        ✓ In stock
      </span>
    </div>

    <h1 className="text-xl font-bold text-gray-800 mb-3 leading-snug">{product.name}</h1>

    <div className="flex items-center gap-4 mb-4 flex-wrap">
      <StarRating score={product.rating} />
      <span className="text-gray-300">|</span>
      <span className="text-gray-500 text-sm">💬 {product.reviews} reviews</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-500 text-sm">{product.sold} sold</span>
    </div>

    {/* Price tiers */}
    <div className="flex gap-2 mb-5 flex-wrap">
      {product.priceTiers.map((tier, i) => (
        <div key={i} className={`rounded-lg px-4 py-2 text-center ${TIER_STYLES[i]}`}>
          <p className="font-bold text-lg leading-tight">{formatPriceShort(tier.price)}</p>
          <p className="text-xs opacity-80 mt-0.5">{tier.range}</p>
        </div>
      ))}
    </div>

    {/* Specs table */}
    <table className="w-full text-sm mb-4">
      <tbody>
        {product.specs.map(({ label, value }) => (
          <tr key={label} className="border-b border-gray-100">
            <td className="py-2 text-gray-400 pr-4 whitespace-nowrap w-1/3">{label}:</td>
            <td className="py-2 text-gray-700">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductInfo;
