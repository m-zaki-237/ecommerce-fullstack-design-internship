const DiscountBanner = () => (
  <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="text-white">
      <h3 className="font-bold text-lg">Super discount on more than 100 USD</h3>
      <p className="text-blue-200 text-sm mt-0.5">Have you ever finally just write dummy info</p>
    </div>
    <button className="bg-orange-400 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-orange-500 transition-colors shrink-0">
      Shop now
    </button>
  </div>
);

export default DiscountBanner;
