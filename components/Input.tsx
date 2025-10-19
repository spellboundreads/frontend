type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  isLabelHidden?: boolean;
};

export default function Input({
  label,
  id,
  isLabelHidden = false,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 ">
      {!isLabelHidden && (
        <label className="capitalize text-xs" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border text-sm border-gray-300 rounded-md w-full p-2 min-w-64 focus:shadow-md focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
