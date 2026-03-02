import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { CreateLinkModal } from "../components/links/CreateLinkModal";
import { linkService } from "../api/linkService";
import toast from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface InsightsData {
  totalClicks: number;
  regionData: { region: string; clicks: number }[];
  timeSeriesData: { date: string; clicks: number }[];
}

export const LinkInsightsPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!shortCode) return;
      setIsLoading(true);
      try {
        const data = await linkService.getLinkInsights(shortCode);
        setInsights(data);
      } catch (error) {
        toast.error("Failed to fetch link insights");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, [shortCode]);

  if (isLoading) {
    return (
      <Layout onNavbarCreate={() => setIsModalOpen(true)}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "var(--spacing-2xl)",
          }}
        >
          <div className="spinner"></div>
        </div>
      </Layout>
    );
  }

  if (!insights) {
    return (
      <Layout onNavbarCreate={() => setIsModalOpen(true)}>
        <div className="empty-state">
          <h3>No data found</h3>
          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout onNavbarCreate={() => setIsModalOpen(true)}>
      <div style={{ marginBottom: "var(--spacing-xl)" }}>
        <button
          onClick={() => navigate("/dashboard")}
          className="btn"
          style={{ marginBottom: "var(--spacing-md)" }}
        >
          <span>⬅️ Back to Dashboard</span>
        </button>

        <h1 style={{ fontSize: "2rem", marginBottom: "var(--spacing-sm)" }}>
          Link Insights: {shortCode}
        </h1>
      </div>

      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--spacing-md)",
          marginBottom: "var(--spacing-xl)",
        }}
      >
        <div
          className="card"
          style={{ padding: "var(--spacing-lg)", textAlign: "center" }}
        >
          <h3
            style={{
              color: "var(--color-muted)",
              fontSize: "0.875rem",
              marginBottom: "0.5rem",
            }}
          >
            Total Clicks
          </h3>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "var(--color-primary)",
            }}
          >
            {insights.totalClicks}
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "var(--spacing-xl)",
        }}
      >
        <div
          className="card"
          style={{ padding: "var(--spacing-lg)", height: "400px" }}
        >
          <h3 style={{ marginBottom: "var(--spacing-md)" }}>
            Clicks Over Time
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={insights.timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="var(--color-primary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="card"
          style={{ padding: "var(--spacing-lg)", height: "400px" }}
        >
          <h3 style={{ marginBottom: "var(--spacing-md)" }}>
            Region Distribution
          </h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={insights.regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clicks" fill="var(--color-primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => navigate("/dashboard")}
      />
    </Layout>
  );
};
