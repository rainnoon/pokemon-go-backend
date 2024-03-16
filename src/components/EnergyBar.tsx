interface EnergyBarProps {
  value: number;
}

export default function EnergyBar({ value }: EnergyBarProps) {
  return (
    <div className="w-full bg-gray-700 rounded-full dark:bg-gray-700">
      <div
        className="bg-accent text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-4"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
