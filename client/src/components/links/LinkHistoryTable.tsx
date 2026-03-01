import React from "react";
import { LinkView } from "../../types/link.types";
import { formatDateTime } from "../../library/helper";

interface LinkHistoryTableProps {
  views: LinkView[];
  isLoading: boolean;
}

export const LinkHistoryTable: React.FC<LinkHistoryTableProps> = ({
  views,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--spacing-2xl)",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (!views.length) {
    return (
      <div className="empty-state">
        <h3>No views yet</h3>
        <p>This link hasn't been visited yet.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Region</th>
            <th>City</th>
            <th>Device</th>
            <th>Browser</th>
            <th>OS</th>
            <th>Platform</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {views.map((view) => (
            <tr key={view._id}>
              <td>{view.country || "Unknown"}</td>
              <td>{view.regionName || "Unknown"}</td>
              <td>{view.city || "Unknown"}</td>
              <td>{view.metadata.deviceType || "Unknown"}</td>
              <td>{view.metadata.app || "Unknown"}</td>
              <td>{view.metadata.os || "Unknown"}</td>
              <td>{view.metadata.platform || "Unknown"}</td>
              <td>{formatDateTime(view.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
