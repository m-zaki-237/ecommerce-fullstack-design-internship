import NewsletterSection from "../common/NewsletterSection";

const FOOTER_LINKS = [
  { title: "About", items: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Partnership", items: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Information", items: ["Help Center", "Money Refund", "Shipping", "Contact us"] },
  { title: "For users", items: ["Login", "Register", "Settings", "My Orders"] },
];

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-8">
    <NewsletterSection />
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {/* Brand col */}
        <div className="col-span-2 sm:col-span-3 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">🛍</div>
            <span className="font-bold text-blue-600">Brand</span>
          </div>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            Best information about the company goes here but now lorem ipsum is
          </p>
          <div className="flex gap-2">
            {["📘", "🐦", "💼", "📸", "▶️"].map((icon, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-xs hover:border-blue-400 hover:text-blue-500 transition-colors"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(({ title, items }) => (
          <div key={title}>
            <h4 className="font-semibold text-gray-800 text-sm mb-3">{title}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item}>
                  <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Get app col */}
        <div>
          <h4 className="font-semibold text-gray-800 text-sm mb-3">Get app</h4>
          <div className="space-y-2">
            <button className="bg-black text-white rounded-lg px-3 py-1.5 flex items-center gap-2 w-full hover:bg-gray-800 transition-colors">
              <span className="text-lg"></span>
              <div className="text-left">
                <div className="text-[9px] opacity-70">Download on the</div>
                <div className="font-semibold text-sm leading-tight">App Store</div>
              </div>
            </button>
            <button className="bg-black text-white rounded-lg px-3 py-1.5 flex items-center gap-2 w-full hover:bg-gray-800 transition-colors">
              <span className="text-base">▶</span>
              <div className="text-left">
                <div className="text-[9px] opacity-70">GET IT ON</div>
                <div className="font-semibold text-sm leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-100 px-6 py-3 flex justify-between items-center text-xs text-gray-400">
      <span>© 2023 Ecommerce.</span>
      <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
        🌐 English <span>▾</span>
      </button>
    </div>
  </footer>
);

export default Footer;
