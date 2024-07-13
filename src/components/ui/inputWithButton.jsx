import { Button } from "./button"
import { Input } from "./input"

export function InputWithButton() {
  return (
    <div className="flex w-full flex-col p-2 ">
      <Input type="email" placeholder="create room" />
    </div>
  )
}

