"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface MaskedTextProps {
  value?: string;
  onChange: (value: string) => void;
}

function MaskedText({ value, onChange }: MaskedTextProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center space-x-1">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default MaskedText;
