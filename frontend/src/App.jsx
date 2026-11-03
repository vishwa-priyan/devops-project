import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [health, setHealth] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("/api/health")
            .then(res => {
                if (!res.ok) throw new Error("API unavailable");
                return res.json();
            })
            .then(data => setHealth(data))
            .catch(() => setError(true));
    }, []);

    return (
        <div className="container">
            <h1>DevOps Deployment Monitor</h1>

            <p>Automated CI/CD Pipeline Dashboard</p>

            <div className="card">
                <h2>Application Status</h2>

                <h3>
                    {health
                        ? "ONLINE"
                        : error
                        ? "OFFLINE"
                        : "CHECKING..."}
                </h3>

                <p>
                    Backend Version:{" "}
                    {health?.version || "N/A"}
                </p>

                <p>
                    Backend Status:{" "}
                    {health?.status || "Unknown"}
                </p>

                <p>
                    Last Checked:{" "}
                    {health?.timestamp
                        ? new Date(health.timestamp).toLocaleString()
                        : "N/A"}
                </p>
            </div>

            <footer>
                Built using React, Node.js and Docker
            </footer>
        </div>
    );
}

export default App;