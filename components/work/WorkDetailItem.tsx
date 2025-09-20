type WorkDetailItemProps = {
  label: string;
  value: string;
};

export default function WorkDetailItem({ label, value }: WorkDetailItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-semibold text-lg">{label}</h2>
      <p className="text-sm">{value}</p>
    </div>
  );
}
