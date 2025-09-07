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
        <label className="capitalize text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`border border-gray-300 rounded-md p-2 w-80 focus:shadow-md focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
