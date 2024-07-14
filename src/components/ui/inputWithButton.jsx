import { Input } from "./input"

export function InputWithButton() {
  return (
    <div className="flex w-full flex-col p-2 ">
      <Input type="email" placeholder="join room"  className="focus:visible-ring" />
    </div>
  )
}

