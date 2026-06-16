import { Link } from "react-router-dom";
import CountdownTimer from "../../components/ui/CountdownTimer";

const DealsSection = ({ products = [] }) => {
  const deals = products.filter((p) => p.discount > 0).slice(0, 5);
  const fallback = [
    { _id: "1", name: "Smart watches", discount: 25, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&h=160&fit=crop"] },
    { _id: "2", name: "Laptops", discount: 15, images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=160&h=160&fit=crop"] },
    { _id: "3", name: "GoPro cameras", discount: 40, images: ["https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=160&h=160&fit=crop"] },
    { _id: "4", name: "Headphones", discount: 25, images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop"] },
    { _id: "5", name: "Canon cameras", discount: 25, images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=160&h=160&fit=crop"] },
  ];
  const displayDeals = deals.length > 0 ? deals : fallback;

  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="md:w-44 p-4 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-gray-800 text-base">Deals and offers</h2>
          <p className="text-gray-400 text-xs mb-3">Hygiene equipments</p>
          <CountdownTimer />
        </div>
      </div>
      <div className="flex overflow-x-auto flex-1">
        {displayDeals.map((deal) => (
          <Link
            key={deal._id}
            to={`/product/${deal._id}`}
            className="flex flex-col items-center border-r border-gray-100 last:border-r-0 p-4 min-w-[130px] hover:bg-gray-50 transition-colors flex-1"
          >
            <img src={deal.images?.[0]} alt={deal.name} className="w-20 h-20 object-cover rounded-lg mb-3" />
            <p className="text-xs text-center text-gray-600 font-medium mb-2 line-clamp-2">{deal.name}</p>
            <span className="badge-discount">-{deal.discount}%</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
