import { useState } from "react";

const TABS = ["Description", "Reviews", "Shipping", "About seller"];

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <div className="card overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Description" && (
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Description body */}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <table className="text-sm mb-4 border border-gray-200 rounded-lg overflow-hidden w-full">
              <tbody>
                {product.tableSpecs.map(({ label, value }) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="px-4 py-2 bg-gray-50 text-gray-600 font-medium w-1/3">{label}</td>
                    <td className="px-4 py-2 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-green-500 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* You may like */}
          <div className="md:w-52 shrink-0">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">You may like</h3>
            <div className="space-y-3">
              {product.youMayLike.map((item) => (
                <button
                  key={item.id}
                  className="flex gap-3 items-center hover:bg-gray-50 rounded-lg p-1.5 w-full text-left transition-colors"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-700 leading-tight mb-0.5 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== "Description" && (
        <div className="p-6 text-sm text-gray-500 text-center py-12">
          {activeTab} content coming soon.
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
