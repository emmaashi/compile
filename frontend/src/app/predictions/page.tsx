"use client";

import { useState } from "react";
import { Search, Calendar, Smile, HeartPulse, Brain, BookOpen, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContentWithCategories {
  title: string;
  description: string;
  categories: {
    [key: string]: {
      title: string;
      recommendations: string[];
    };
  };
}

interface Command {
  name: string;
  icon: JSX.Element;
  disabled?: boolean;
  content?: ContentWithCategories;
}

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const careContent: ContentWithCategories = {
    title: "Optimizing Current Care",
    description: "Comprehensive care recommendations focusing on comfort and quality of life.",
    categories: {
      physical: {
        title: "Physical Comfort",
        recommendations: [
          "Implement regular pain assessment and management protocols",
          "Position patient semi-upright to help with breathing and mucus",
          "Use soft, absorbent materials for bladder management",
          "Offer small sips of water or ice chips for comfort",
          "Ensure proper bed positioning with supportive pillows",
          "Regular gentle mouth care to maintain comfort"
        ]
      },
      daily: {
        title: "Daily Care",
        recommendations: [
          "Monitor breathing patterns and use oxygen if prescribed",
          "Regular gentle repositioning every 2-3 hours",
          "Keep the room at a comfortable temperature",
          "Use a humidifier to help with breathing",
          "Maintain a quiet, peaceful environment",
          "Regular but gentle personal hygiene care"
        ]
      }
    }
  };

  const emotionalContent: ContentWithCategories = {
    title: "Navigating Emotional Challenges",
    description: "Supporting emotional well-being during this sensitive time.",
    categories: {
      support: {
        title: "Emotional Support",
        recommendations: [
          "Maintain a calming presence and gentle touch",
          "Speak softly and reassuringly, even if there's no response",
          "Share memories and express feelings of love",
          "Play favorite music or read familiar stories",
          "Respect moments of silence and rest",
          "Allow close family members quiet time together"
        ]
      },
      family: {
        title: "Family Support",
        recommendations: [
          "Create a schedule for family members to ensure someone is always present",
          "Encourage open expression of emotions among family members",
          "Consider involving a grief counselor or spiritual advisor",
          "Document and share meaningful moments together",
          "Take breaks when needed - self-care is important",
          "Maintain regular communication with healthcare providers"
        ]
      }
    }
  };

  const filteredCommands: Command[] = [
    { 
      name: "Optimizing Current Care", 
      icon: <Calendar className="mr-2 h-4 w-4" />,
      content: careContent
    },
    { name: "What to Expect Next?", icon: <Smile className="mr-2 h-4 w-4" /> },
    { 
      name: "Navigating Emotional Challenges", 
      icon: <Heart className="mr-2 h-4 w-4" />,
      content: emotionalContent
    },
    { name: "Educational Resources", icon: <BookOpen className="mr-2 h-4 w-4" /> },
  ];

  const handleCommandClick = (command: Command): void => {
    setSelectedCommand(command);
    if (command.content) {
      setIsDialogOpen(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-[450px] shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-medium">Care Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Type a command or search..."
              value={query}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <ScrollArea className="h-[300px] rounded-md">
            {filteredCommands.filter((command) => 
              command.name.toLowerCase().includes(query.toLowerCase())
            ).length === 0 ? (
              <div className="p-4 text-center text-gray-500">No results found.</div>
            ) : (
              <div className="space-y-4">
                <div className="font-medium text-sm text-gray-500">Suggestions</div>
                <div className="space-y-2">
                  {filteredCommands
                    .filter((command) => command.name.toLowerCase().includes(query.toLowerCase()))
                    .map((command, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start hover:bg-gray-100"
                        onClick={() => handleCommandClick(command)}
                      >
                        {command.icon}
                        <span className="truncate">{command.name}</span>
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary">
              {selectedCommand?.content?.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-gray-600">
              {selectedCommand?.content?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCommand?.content && (
            <Tabs defaultValue={Object.keys(selectedCommand.content.categories)[0]} className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                {Object.keys(selectedCommand.content.categories).map((key) => (
                  <TabsTrigger key={key} value={key} className="capitalize">
                    {selectedCommand?.content?.categories[key].title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.keys(selectedCommand.content.categories).map((key) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <Alert>
                    <AlertDescription>
                      <div className="space-y-4">
                        {selectedCommand?.content?.categories[key].recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Badge variant="outline" className="mt-1 flex-shrink-0 bg-primary/5">
                              {index + 1}
                            </Badge>
                            <p className="text-sm text-gray-600 leading-relaxed">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
