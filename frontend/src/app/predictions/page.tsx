"use client";

import { useState } from "react";
import { Search, Calendar, Smile, HeartPulse, Brain, BookOpen } from "lucide-react";

interface Command {
  name: string;
  icon: JSX.Element;
  disabled?: boolean;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [selectedCommand, setSelectedCommand] = useState<string>("");

  const handleCommandClick = (command: string): void => {
    alert(`You selected: ${command}`);
    setQuery(""); // Clear search input after selection
  };

  const filteredCommands: Command[] = [
    { name: "Optimizing Current Care", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "What to Expect Next?", icon: <Smile className="mr-2 h-4 w-4" /> },
    { name: "Overcoming Physical Challenges", icon: <HeartPulse className="mr-2 h-4 w-4" /> },
    { name: "Navigating Mental Challenges", icon: <Brain className="mr-2 h-4 w-4" />, disabled: true },
    { name: "Educational Resources", icon: <BookOpen className="mr-2 h-4 w-4" /> },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg border shadow-md md:min-w-[450px]">
        <div className="flex items-center p-2 border-b">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={handleSearchChange}
            className="w-full outline-none"
          />
        </div>

        <div className="p-2 max-h-96 overflow-y-auto">
          {filteredCommands.filter((command) => command.name.toLowerCase().includes(query.toLowerCase()))
            .length === 0 ? (
            <div>No results found.</div>
          ) : (
            <div>
              <div className="font-bold">Suggestions</div>
              <div>
                {filteredCommands
                  .filter((command) => command.name.toLowerCase().includes(query.toLowerCase()))
                  .map((command, index) => (
                    <div
                      key={index}
                      onClick={() => handleCommandClick(command.name)}
                      className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                        command.disabled ? "text-gray-400 cursor-not-allowed" : ""
                      }`}
                    >
                      {command.icon}
                      <span>{command.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
