export function ErrorMessage({ message }: { message: string }) {
  return <p className="text-red-500 text-sm text-center">{message}</p>;
}

export function FieldError({ message }: { message: string }) {
  return <p className="text-red-500 text-xs">{message}</p>;
}