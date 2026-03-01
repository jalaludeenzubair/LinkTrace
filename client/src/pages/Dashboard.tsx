import React, { useState, useEffect, useCallback } from "react";
import { Layout } from "../components/layout/Layout";
import { LinksTable } from "../components/links/LinksTable";
import { CreateLinkModal } from "../components/links/CreateLinkModal";
import { Pagination } from "../components/links/Pagination";
import { linkService } from "../api/linkService";
import { Link } from "../types/link.types";
import toast from "react-hot-toast";

export const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLinks = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await linkService.getLinks(page, 10);
      setLinks(response.links || []);
      setTotalPages(response.totalPages);
      setCurrentPage(response.page);
    } catch (error) {
      toast.error("Failed to fetch links");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks(currentPage);
  }, [currentPage, fetchLinks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateSuccess = () => {
    fetchLinks(1);
  };
  const deleteLink = useCallback(async (id: string) => {
    try {
      const response = await linkService.deleteLink(id);
      if (response.success) {
        toast.success("Link deleted successfully");
        setLinks((prev) => prev.filter((link) => link._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete link");
    }
  }, []);
  return (
    <>
      <Layout onNavbarCreate={() => setIsModalOpen(true)}>
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "var(--spacing-md)" }}>
            Your Links
          </h1>
          <p style={{ color: "var(--color-muted)" }}>
            Manage and track all your shortened URLs
          </p>
        </div>

        <LinksTable
          links={links}
          isLoading={isLoading}
          deleteLinkCallback={deleteLink}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      </Layout>

      <CreateLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
};
