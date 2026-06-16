const StarRating = ({ score, maxScore = 10 }) => {
  const pct = (score / maxScore) * 100;
  return (
    <div className="flex items-center gap-1.5">
      <div className="relative inline-block text-base leading-none">
        <span className="text-gray-200">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-yellow-400"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </div>
      <span className="text-blue-500 text-sm font-medium">{score}</span>
    </div>
  );
};

export default StarRating;
