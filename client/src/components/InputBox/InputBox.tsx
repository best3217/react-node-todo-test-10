import React, { useState, useRef } from "react"
import { Input, Button, InputRef } from "antd"

import "./InputBox.scss"

interface SeachProps {
  placeholder: string
  onAddClick: (note: string) => void
}

const InputBox: React.FC<SeachProps> = ({ placeholder, onAddClick }) => {
  const inputRef = useRef<InputRef>(null)
  const [note, setNote] = useState<string>("")

  const handleOnClick = async () => {
    await onAddClick(note)
    setNote("")
    if (!inputRef.current) return
    inputRef.current.focus()
  }

  return (
    <div className="search-container">
      <Input
        type="text"
        placeholder={placeholder}
        ref={inputRef}
        value={note}
        onChange={(e: any) => setNote(e.target.value)}
      />
      <Button className="btn-add" onClick={handleOnClick}>
        Add
      </Button>
    </div>
  )
}

export default InputBox
