import Graph from "@/app/visualizations/components/Graph"

// The graph should be naviagted to once the patient is selected 
export default function VisualizationsPage() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Visualizations</h1>
        <div className="w-full h-[600px]">
          <Graph />
        </div>
      </div>
    );
  }