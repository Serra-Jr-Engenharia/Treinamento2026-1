import { type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputForm = ({ ...props }: InputProps) => {
  return (
    <input
      className="w-full p-4 border rounded-3xl border-secondary focus:border-primary"
      {...props}
    />
  )
}