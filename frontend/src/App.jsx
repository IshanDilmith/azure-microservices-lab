import { useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const serviceCards = [
  { label: "🏗️ Architecture", value: "Microservices" },
  { label: "⚙️ Framework", value: "Node.js Express" },
  { label: "🌍 Region", value: "Southeast Asia" },
  { label: "📍 Platform", value: "Azure Container Apps" },
  { label: "🔐 Protocol", value: "HTTPS/REST" },
  { label: "📈 Version", value: "3.0.0" },
  { label: "🗄️ Database", value: "Azure SQL Database" },
  { label: "📡 Load Balancer", value: "Azure ALB" }
];

function formatHealthResult(responseTime, response, bodyText) {
  const statusEmoji = response.status === 200 ? "✅" : "⚠️";
  let content = `${statusEmoji} HEALTH CHECK RESULT\n`;
  content += `${"═".repeat(70)}\n\n`;
  content += `Status Code      : ${response.status} ${response.statusText}\n`;
  content += `Response Time    : ${responseTime}ms\n`;
  content += `Timestamp        : ${new Date().toLocaleString()}\n`;
  content += `Gateway URL      : ${API_URL}\n`;
  content += `Protocol         : HTTPS\n`;
  content += `Region           : Southeast Asia\n`;
  content += `Platform         : Azure Container Apps\n\n`;
  content += `Response Body:\n${bodyText}\n\n`;
  content += `${"═".repeat(70)}\n`;
  content += `✅ Gateway health check completed successfully!`;
  return content;
}

function formatItemsResult(responseTime, response, items, itemCount) {
  const statusEmoji = response.status === 200 ? "✅" : "⚠️";
  let content = `${statusEmoji} ITEMS RETRIEVAL RESULT\n`;
  content += `${"═".repeat(70)}\n\n`;
  content += `Status Code      : ${response.status} ${response.statusText}\n`;
  content += `Response Time    : ${responseTime}ms\n`;
  content += `Timestamp        : ${new Date().toLocaleString()}\n`;
  content += `Database         : Azure SQL Database\n`;
  content += `Endpoint         : /api/items\n`;
  content += `Method           : GET\n\n`;
  content += `Items Found      : ${itemCount}\n\n`;
  content += `Data Retrieved:\n`;
  content += `${JSON.stringify(items, null, 2)}\n\n`;
  content += `${"═".repeat(70)}\n`;
  content += `✅ Data retrieval successful!`;
  return content;
}

function formatError(title, error, requestUrl, troubleshootingSteps) {
  let content = `❌ ${title}\n`;
  content += `${"═".repeat(70)}\n\n`;
  content += `Error Type       : ${error.name}\n`;
  content += `Error Message    : ${error.message}\n`;
  content += `Timestamp        : ${new Date().toLocaleString()}\n`;
  content += `Request URL      : ${requestUrl}\n\n`;
  content += `Troubleshooting Steps:\n`;

  troubleshootingSteps.forEach((step, index) => {
    content += `  ${index + 1}. ${step}\n`;
  });

  content += `\n${"═".repeat(70)}\n`;
  return content;
}

export default function App() {
  const [requestCount, setRequestCount] = useState(0);
  const [responseTime, setResponseTime] = useState("--");
  const [gatewayStatus, setGatewayStatus] = useState("--");
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);

  const updateRequestCount = () => {
    setRequestCount((currentCount) => currentCount + 1);
  };

  const showResponse = (content) => {
    setShowResult(true);
    setResult(content);
  };

  const checkHealth = async () => {
    updateRequestCount();
    showResponse("⏳ Connecting to gateway...\n\nInitializing health check diagnostics...");

    try {
      const startTime = Date.now();
      const response = await fetch(`${API_URL}/health`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });
      const elapsedTime = Date.now() - startTime;

      setResponseTime(`${elapsedTime}ms`);
      setGatewayStatus(response.status === 200 ? "✅ Healthy" : "⚠️ Warning");

      const bodyText = await response.text();
      showResponse(formatHealthResult(elapsedTime, response, bodyText));
    } catch (error) {
      console.error("Fetch error:", error);
      setGatewayStatus("❌ Error");
      showResponse(
        formatError("HEALTH CHECK FAILED", error, `${API_URL}/health`, [
          "Verify gateway service is running",
          "Check network connectivity",
          "Review CORS configuration",
          "Check Azure portal logs",
          "Verify Azure Container Apps status",
          "Check firewall rules"
        ])
      );
    }
  };

  const getItems = async () => {
    updateRequestCount();
    showResponse("⏳ Fetching items from database...\n\nQuerying microservices backend...");

    try {
      const startTime = Date.now();
      const response = await fetch(`${API_URL}/api/items`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });
      const elapsedTime = Date.now() - startTime;

      setResponseTime(`${elapsedTime}ms`);
      setGatewayStatus(response.status === 200 ? "✅ Healthy" : "⚠️ Warning");

      const items = await response.json();
      const itemCount = Array.isArray(items) ? items.length : 1;

      showResponse(formatItemsResult(elapsedTime, response, items, itemCount));
    } catch (error) {
      console.error("Fetch error:", error);
      setGatewayStatus("❌ Error");
      showResponse(
        formatError("ITEMS RETRIEVAL FAILED", error, `${API_URL}/api/items`, [
          "Verify API endpoint is accessible",
          "Check database connectivity",
          "Review microservice logs",
          "Validate request format",
          "Check Azure SQL firewall rules",
          "Verify database permissions"
        ])
      );
    }
  };

  const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: responseTime, label: "Response Time" },
    { value: gatewayStatus, label: "Gateway Status" },
    { value: String(requestCount), label: "Total Requests" }
  ];

  return (
    <div className="wrapper">
      <nav className="navbar">
        <a href="#" className="navbar-brand" onClick={(event) => event.preventDefault()}>
          <div className="navbar-icon">☁️</div>
          <span>Azure Microservices • Gateway Portal v3.0</span>
        </a>
        <div className="status-badge">
          <div className="status-dot" />
          <span>System Online</span>
        </div>
      </nav>

      <main className="container">
        <header className="header">
          <div className="logo-container">
            <div className="logo-circle">🚀</div>
          </div>
          <h1>Gateway Portal</h1>
          <p>Cloud-Native Microservices Management Interface</p>
          <div className="subtitle-accent">✨ Azure Container Apps • Southeast Asia Region • Production</div>
        </header>

        <section className="stats-grid" aria-label="gateway stats">
          {stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </article>
          ))}
        </section>

        <section className="main-grid" aria-label="primary actions">
          <article className="card">
            <div className="card-content">
              <div className="card-icon-box">❤️</div>
              <h3 className="card-title">Health Check</h3>
              <p className="card-desc">Monitor real-time gateway health status, endpoint connectivity, and service availability with comprehensive diagnostics</p>
              <button className="btn-primary" onClick={checkHealth}>
                <span>🔍</span>
                <span>Check Gateway Health</span>
              </button>
            </div>
          </article>

          <article className="card">
            <div className="card-content">
              <div className="card-icon-box">📊</div>
              <h3 className="card-title">Retrieve Items</h3>
              <p className="card-desc">Fetch data from microservices backend databases with response analytics, performance metrics, and error handling</p>
              <button className="btn-primary" onClick={getItems}>
                <span>📦</span>
                <span>Get Items</span>
              </button>
            </div>
          </article>
        </section>

        <section className="result-section">
          <div className="result-title">
            <div className="result-icon">📋</div>
            <span>API Response Output</span>
          </div>
          <pre className={`result-content ${showResult ? "show" : ""}`}>{result}</pre>
        </section>

        <section className="service-info-grid" aria-label="service information">
          {serviceCards.map((card) => (
            <article key={card.label} className="stat-card">
              <div className="stat-label">{card.label}</div>
              <div className="service-value">{card.value}</div>
            </article>
          ))}
        </section>

        <footer className="footer">
          <p>© 2024 Azure Microservices Lab • CTSE Course | Built with ☁️ Azure | <strong>Status:</strong> All services operational</p>
        </footer>
      </main>
    </div>
  );
}
