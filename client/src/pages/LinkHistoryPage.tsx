import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { LinkHistoryTable } from "../components/links/LinkHistoryTable";
import { linkService } from "../api/linkService";
import { LinkView } from "../types/link.types";
import toast from "react-hot-toast";
import { CreateLinkModal } from "../components/links/CreateLinkModal";

export const LinkHistoryPage: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const [views, setViews] = useState<LinkView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!shortCode) return;

      setIsLoading(true);
      try {
        const data = await linkService.getLinkHistory(shortCode);
        setViews(data);
      } catch (error) {
        toast.error("Failed to fetch link history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [shortCode]);

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
          Link Analytics
        </h1>
        <p
          style={{
            color: "var(--color-muted)",
            marginBottom: "var(--spacing-md)",
          }}
        >
          Short code:{" "}
          <code
            style={{
              background: "var(--color-bg)",
              padding: "0.25rem 0.5rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            {shortCode}
          </code>
        </p>
      </div>

      <LinkHistoryTable views={views} isLoading={isLoading} />
      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => navigate("/dashboard")}
      />
    </Layout>
  );
};
