import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="bg-gray-50 py-8 text-center border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-1">
        Get daily news on upcoming offers from many suppliers all over the world
      </p>
      <h3 className="font-semibold text-gray-800 text-lg mb-4">Subscribe on our newsletter</h3>
      <form onSubmit={handleSubmit} className="flex justify-center gap-0 max-w-sm mx-auto px-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="📧 Email"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md text-sm focus:outline-none focus:border-blue-400"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-r-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
