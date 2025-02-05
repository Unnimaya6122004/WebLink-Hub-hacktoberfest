import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const App = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/apps.json") // Replace with actual API or file path
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((error) => console.error("Error fetching apps:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">WebLink Hub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card key={app.id} className="p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{app.name}</h2>
              <p className="text-gray-600">{app.description}</p>
              <Button className="mt-4" asChild>
                <a href={app.link} target="_blank" rel="noopener noreferrer">
                  Open App
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default App;
