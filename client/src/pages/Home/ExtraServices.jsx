import { EXTRA_SERVICES } from "../../data/products";

const ExtraServices = () => (
  <section>
    <h2 className="section-title">Our extra services</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {EXTRA_SERVICES.map((service) => (
        <button
          key={service.id}
          className="card overflow-hidden hover:shadow-md transition-shadow group text-left"
        >
          <div className="relative h-32 overflow-hidden">
            <img
              src={service.img}
              alt={service.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-2 right-2 text-2xl">{service.icon}</span>
          </div>
          <div className="p-3">
            <p className="text-sm font-medium text-gray-700 text-center leading-tight">
              {service.label}
            </p>
          </div>
        </button>
      ))}
    </div>
  </section>
);

export default ExtraServices;
