import React, { useState } from "react";
import { Input, Button } from "antd";

import "./InputBox.scss";

interface SeachProps {
  placeholder: string;
  onAddClick: (note: string) => void;
}

const InputBox: React.FC<SeachProps> = ({ placeholder, onAddClick }) => {
  const [note, setNote] = useState<string>("");

  return (
    <div className="search-container">
      <Input
        type="text"
        placeholder={placeholder}
        value={note}
        onChange={(e: any) => setNote(e.target.value)}
      />
      <Button
        className="btn-add"
        onClick={() => {
          onAddClick(note);
          setNote("");
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default InputBox;
