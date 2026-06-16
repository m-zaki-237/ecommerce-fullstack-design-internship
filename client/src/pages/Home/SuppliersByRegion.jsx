import { SUPPLIERS_BY_REGION } from "../../data/products";

const SuppliersByRegion = () => (
  <section>
    <h2 className="section-title">Suppliers by region</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {SUPPLIERS_BY_REGION.map((supplier) => (
        <button
          key={supplier.id}
          className="card p-3 flex items-center gap-2 hover:border-blue-300 hover:shadow-sm transition-all"
        >
          <span className="text-2xl shrink-0">{supplier.flag}</span>
          <div className="text-left min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{supplier.country}</p>
            <p className="text-xs text-blue-500 truncate">{supplier.url}</p>
          </div>
        </button>
      ))}
    </div>
  </section>
);

export default SuppliersByRegion;
