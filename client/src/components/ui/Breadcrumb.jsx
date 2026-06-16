const Breadcrumb = ({ items }) => (
  <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
    {items.map((item, index) => (
      <span key={item} className="flex items-center gap-2">
        <button className="hover:text-blue-600 transition-colors">{item}</button>
        {index < items.length - 1 && (
          <span className="text-gray-300 select-none">›</span>
        )}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
