import { useState } from "react";

const ProductImages = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="md:w-80 shrink-0">
      <div className="bg-gray-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center h-72 border border-gray-100">
        <img
          src={images[activeIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
              activeIndex === i ? "border-blue-500" : "border-transparent hover:border-gray-300"
            }`}
          >
            <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
