interface IformError {
  message: string | null;
}

export default function FormError({ message }: IformError) {
  return message ? <div className="text-sm text-red-700">{message}</div> : null;
}
