import useCountdown from "../../hooks/useCountdown";

const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(350000);

  return (
    <div className="flex gap-1 items-center">
      {[
        [days, "Days"],
        [hours, "Hour"],
        [minutes, "Min"],
        [seconds, "Sec"],
      ].map(([val, label]) => (
        <div
          key={label}
          className="flex flex-col items-center bg-red-500 text-white rounded px-2 py-1 min-w-[40px]"
        >
          <span className="text-sm font-bold leading-none">{val}</span>
          <span className="text-[9px] uppercase tracking-wide mt-0.5 opacity-90">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
