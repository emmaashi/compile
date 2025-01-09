import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-6 space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Data Driven Insights for Better Cancer Care.
        </h1>
        <p className="text-lg text-gray-600">
          Compile is designed to support families and caregivers by tracking symptoms, analyzing patient data, and navigating the challenges of in-home hospice care.
        </p>
        <br></br>
        <Link href="/profile">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </Link>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Features & Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Symptom Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-600">
                Log daily symptoms and medical updates to ensure accurate and consistent monitoring.
              </p>
              <Badge variant="outline">Real-Time Updates</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-600">
                Leverage machine learning to predict cancer progression and provide actionable insights.
              </p>
              <Badge variant="outline">AI-Powered</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Emotional Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-600">
                Receive tailored advice on coping with the emotional challenges of hospice care.
              </p>
              <Badge variant="outline">Human-Centric</Badge>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}