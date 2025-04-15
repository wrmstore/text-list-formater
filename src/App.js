import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleFormat = () => {
    const lines = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    setOutput(lines.join(", "));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard!");
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Text List Formatter</h1>
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode">Dark Mode</Label>
          <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-bold">Input</h2>
            <Textarea
              placeholder="Masukkan daftar, satu baris per item..."
              rows={10}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleFormat}>Format</Button>
          </CardContent>
        </Card>

        <Card className={darkMode ? "bg-gray-800" : ""}>
          <CardContent className="p-4 space-y-2">
            <h2 className="text-xl font-bold">Output</h2>
            <Textarea
              readOnly
              rows={10}
              value={output}
              className={darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}
            />
            <Button onClick={handleCopy}>Copy to Clipboard</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
