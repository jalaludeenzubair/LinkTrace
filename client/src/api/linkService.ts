import { api } from "./axios";
import {
  Link,
  LinkView,
  PaginatedResponse,
  ApiResponse,
  AnalyticsData,
} from "../types/link.types";

export const linkService = {
  async createLink(url: string): Promise<ApiResponse<string>> {
    const response = await api.post<ApiResponse<string>>("/link/create", {
      url,
    });
    return response.data;
  },

  async getLinks(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<Link>> {
    const response = await api.post<ApiResponse<PaginatedResponse<Link>>>(
      "/view/links",
      {
        page,
        limit,
      },
    );
    return response.data?.data;
  },

  async getLinkHistory(
    shortenUrl: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<LinkView>> {
    const response = await api.get<ApiResponse<PaginatedResponse<LinkView>>>(
      `/view/links/${shortenUrl}`,
      { params: { page, limit } },
    );
    return response.data?.data;
  },

  async getLinkInsights(id: string): Promise<AnalyticsData> {
    const response = await api.get<ApiResponse<AnalyticsData>>(
      `/view/links/${id}/insights`,
    );
    return response.data?.data;
  },

  async logout(): Promise<void> {
    await api.post("/user/logout");
  },
  async deleteLink(id: string): Promise<ApiResponse<string>> {
    const response = await api.delete<ApiResponse<string>>(
      `/link/delete/${id}`,
    );
    return response.data;
  },
};
