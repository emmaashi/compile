import Graph from "@/app/visualizations/components/Graph"
import { Badge } from "@/components/ui/badge";
import { Separator } from "@radix-ui/react-separator";

export default function VisualizationsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
      <h1 className="text-4xl font-extrabold text-gray-800">
          Visualizations
        </h1>
        <Separator/>
        <br></br>
        <div className="flex gap-3">
          <Badge variant="outline">An Min Zhai</Badge>
          <Badge variant="outline">Age: 87</Badge>
          <Badge variant="outline">Stomach Cancer</Badge>
        </div>
      </div>

      <div>
        <div className="w-full h-[600px]">
          <Graph />
        </div>
      </div>
    </div>
  );
}