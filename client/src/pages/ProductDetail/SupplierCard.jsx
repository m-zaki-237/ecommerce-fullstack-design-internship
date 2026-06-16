const SupplierCard = ({ supplier }) => (
  <div className="md:w-56 shrink-0">
    <div className="card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
          {supplier.initial}
        </div>
        <div>
          <p className="text-xs text-gray-400">Supplier</p>
          <p className="text-sm font-semibold text-gray-800">{supplier.name}</p>
        </div>
      </div>

      <div className="space-y-1.5 text-xs text-gray-500 mb-4">
        <p className="flex items-center gap-2">
          <span>{supplier.flag}</span> {supplier.country}
        </p>
        {supplier.verified && (
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Verified Seller
          </p>
        )}
        {supplier.worldwide && (
          <p className="flex items-center gap-2">
            <span>🌐</span> Worldwide shipping
          </p>
        )}
      </div>

      <button className="btn-primary w-full py-2.5 mb-2 text-sm">Send inquiry</button>
      <button className="link-blue w-full text-center block">Seller's profile</button>

      <div className="border-t border-gray-100 mt-3 pt-3 flex justify-center">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
          🤍 Save for later
        </button>
      </div>
    </div>
  </div>
);

export default SupplierCard;
