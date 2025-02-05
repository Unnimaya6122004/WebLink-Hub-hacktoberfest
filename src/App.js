import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const App = () => {
  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Unnimaya6122004/WebLink-Hub-hacktoberfest/main/public/apps.json"
    )
      .then((res) => res.json())
      .then((data) => setApps(data))
      .catch((error) => console.error("Error fetching apps:", error));
  }, []);

  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || app.category === category)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🌐 WebLink Hub</h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
        <Input
          placeholder="🔍 Search apps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2"
        />
        <select
          className="p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Productivity">Productivity</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      {/* App Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <motion.div key={app.id} whileHover={{ scale: 1.05 }}>
              <Card className="p-4 shadow-lg">
                <CardContent className="flex flex-col items-center">
                  <img
                    src={app.logo || "https://via.placeholder.com/100"}
                    alt={`${app.name} logo`}
                    className="w-16 h-16 mb-3"
                  />
                  <h2 className="text-xl font-semibold">{app.name}</h2>
                  <p className="text-gray-600 text-center">{app.description}</p>
                  <Button className="mt-4 w-full" asChild>
                    <a href={app.link} target="_blank" rel="noopener noreferrer">
                      Open App 🚀
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No apps found 😔</p>
        )}
      </motion.div>
    </div>
  );
};

export default App;
