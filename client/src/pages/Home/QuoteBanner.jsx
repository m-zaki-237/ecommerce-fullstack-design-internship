import { useState } from "react";

const QuoteBanner = () => {
  const [form, setForm] = useState({ item: "", details: "", quantity: "", unit: "Pcs" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ item: "", details: "", quantity: "", unit: "Pcs" });
  };

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col md:flex-row"
      style={{ background: "linear-gradient(135deg, #1a6b8a 0%, #2389b1 60%, #1a6b8a 100%)" }}
    >
      <div className="flex-1 p-8 text-white flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">
          An easy way to send requests to all suppliers
        </h2>
        <p className="text-blue-100 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
        </p>
      </div>

      <div className="bg-white m-4 rounded-xl p-6 md:w-80 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Send quote to suppliers</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="What item you need?"
            className="input-field"
          />
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="Type more details"
            rows={3}
            className="input-field resize-none"
          />
          <div className="flex gap-2">
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="input-field flex-1"
            />
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-blue-400 bg-white"
            >
              <option>Pcs</option>
              <option>Kg</option>
              <option>Box</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full py-2.5 text-sm font-semibold">
            Send inquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteBanner;
