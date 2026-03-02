import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "../../types/link.types";
import toast from "react-hot-toast";
import { constructShortUrl } from "../../library/helper";
import { DeleteConfirmationModal } from "../DeleteModal";

interface LinksTableProps {
  links: Link[];
  isLoading: boolean;
  deleteLinkCallback: (id: string) => void;
}

export const LinksTable: React.FC<LinksTableProps> = ({
  links,
  isLoading,
  deleteLinkCallback,
}) => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  if (!links.length) {
    return (
      <div className="empty-state">
        <h3>No links yet</h3>
        <p>Click the "Create Link" button to shorten your first URL.</p>
      </div>
    );
  }

  const handleDeleteClick = (id: string) => {
    setSelectedLinkId(id);
    setIsDeleteOpen(true);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Created</th>
            <th>Visits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr
              key={link._id}
              onClick={() => navigate(`/dashboard/history/${link.shortenUrl}`)}
            >
              <td>
                <div style={{ color: "var(--color-primary)" }}>
                  {link.shortenUrl}
                </div>
              </td>
              <td style={{ maxWidth: "300px" }}>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.originalUrl}
                </div>
              </td>
              <td>{formatDate(link.createdAt)}</td>
              <td>{link.visitCount || 0}</td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-primary"
                    style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(
                        constructShortUrl(link.shortenUrl),
                      );
                      toast.success("Copied to clipboard!");
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(link._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          deleteLinkCallback(selectedLinkId!);
          setIsDeleteOpen(false);
          setIsDeleting(false);
        }}
        isLoading={isDeleting}
        title="Delete Link"
        message="Are you sure you want to delete this link? This action cannot be undone."
        confirmText="Delete Link"
      />
    </div>
  );
};
