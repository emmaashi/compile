"use client"

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity,
  Calendar,
  Clock,
  Heart,
  Info,
  Pill,
  AlertCircle,
  Coffee
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Button } from "@/components//ui/button"
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  values: number[];
  label: string;
  title: string;
  yAxisLabel: string;
}

const CustomLineChart = ({ labels, values, label, title, yAxisLabel }: LineChartProps) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: "rgba(147, 112, 219, 0.7)",
        backgroundColor: "rgba(147, 112, 219, 0.7)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  
  return (
    <div className="h-[200px] w-full">
      <Line options={options} data={data} />
    </div>
  );
};

const painData = {
  labels: ['6AM', '10AM', '2PM', '6PM', '10PM'],
  values: [3, 4, 2, 5, 3],
};

const appetiteData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  values: [60, 45, 55, 40, 50],
};

const sleepData = {
  labels: ['1/5', '1/6', '1/7', '1/8', '1/9'],
  values: [6.5, 7.2, 5.8, 6.9, 6.2],
};

const ageGroupData = {
  labels: ["15-39", "40-49", "50-59", "60-69", "70-79", "80-99"],
  datasets: [
    {
      label: "Men",
      data: [35, 30, 25, 20, 15, 10],
      backgroundColor: "rgba(65, 105, 225, 0.7)",
    },
    {
      label: "Women",
      data: [34, 29, 28, 22, 18, 12],
      backgroundColor: "rgba(219, 112, 147, 0.7)",
    },
  ],
};

const cancerStageData = {
  labels: ["Localized", "Regional", "Distant"],
  datasets: [
    {
      label: "5-Year Survival Rates",
      data: [75, 40, 15],
      backgroundColor: "rgba(147, 112, 219, 0.7)",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      font: {
        size: 16,
      },
    },
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Survival Rate (%)",
      },
    },
    x: {
      title: {
        display: true,
      },
    },
  },
};

const medications = [
  { name: "Omeprazole", dose: "20mg", time: "Morning" },
  { name: "Metformin", dose: "500mg", time: "Morning & Evening" },
  { name: "Insulin", dose: "10 units", time: "Before Meals" },
  { name: "Morphine", dose: "15mg", time: "Every 4 Hours" },
  { name: "Ondansetron", dose: "8mg", time: "As Needed" },
  { name: "Pantoprazole", dose: "40mg", time: "Morning" },
  { name: "Furosemide", dose: "20mg", time: "Morning" },
  { name: "Aspirin", dose: "81mg", time: "Morning" },
  { name: "Atorvastatin", dose: "10mg", time: "Night" },
];

export default function VisualizationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMedications = medications.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 ml-5 mt-5">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Visualizations</h1>
            <div className="flex gap-3 mt-4">
              <Badge variant="outline">An Min Zhai</Badge>
              <Badge variant="outline">Age: 87</Badge>
              <Badge variant="secondary">Stomach Cancer - Stage IV</Badge>
              <Badge variant="outline">In-Home Hospice Care</Badge>
            </div>
          </div>
          <Alert className="w-fit">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Next Nurse Visit</AlertTitle>
            <AlertDescription>Tomorrow at 10:00 AM</AlertDescription>
          </Alert>
        </div>
        <Separator />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="resources">Care Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pain Level Tracking</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CustomLineChart 
                  labels={painData.labels}
                  values={painData.values}
                  label="Pain Level"
                  title="Daily Pain Levels"
                  yAxisLabel="Pain (0-10)"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Appetite Tracking</CardTitle>
                <Coffee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CustomLineChart 
                  labels={appetiteData.labels}
                  values={appetiteData.values}
                  label="Food Intake"
                  title="Daily Food Intake"
                  yAxisLabel="% of normal intake"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sleep Pattern</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CustomLineChart 
                  labels={sleepData.labels}
                  values={sleepData.values}
                  label="Sleep Duration"
                  title="Sleep Hours"
                  yAxisLabel="Hours"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Daily Notes & Symptoms</CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Common Symptoms to Monitor</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                        <li>Nausea levels and frequency</li>
                        <li>Breathing changes or difficulty</li>
                        <li>Energy levels and alertness</li>
                        <li>Comfort and positioning needs</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium">Today's Notes</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor fluid intake and ensure regular position changes every 2 hours.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Care Schedule</CardTitle>
              <CardDescription>Recommended care routine for optimal comfort</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center space-x-4">
                  <Clock className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Morning Care</p>
                    <p className="text-sm text-muted-foreground">7:00 AM - 9:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Pill className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Medication Times</p>
                    <p className="text-sm text-muted-foreground">Every 4-6 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Heart className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Comfort Checks</p>
                    <p className="text-sm text-muted-foreground">Every 2 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Nurse Visits</p>
                    <p className="text-sm text-muted-foreground">3x per week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historical Data Content */}
        <TabsContent value="historical" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Group Survival Rates</CardTitle>
                <CardDescription>5-Year survival rates by age and gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Bar 
                    data={ageGroupData} 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: "5-Year Survival Rates by Age Group",
                        },
                      },
                    }} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cancer Stage Outcomes</CardTitle>
                <CardDescription>5-Year survival rates by cancer stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Bar 
                    data={cancerStageData} 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        title: {
                          ...chartOptions.plugins.title,
                          text: "5-Year Survival Rates by Cancer Stage",
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="medication" className="space-y-6">
      {/* Search bar */}
      <Input
        type="text"
        placeholder="Search for medication..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      {/* Medication Table */}
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableCell>Medication Name</TableCell>
            <TableCell>Dose</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMedications.length > 0 ? (
            filteredMedications.map((med, index) => (
              <TableRow key={index}>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dose}</TableCell>
                <TableCell>{med.time}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No medications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Medication Button */}
      <Button>Add Medication</Button>
    </TabsContent>
      </Tabs>
    </div>
  );
}
