import { api } from "./axios";
import {
  Link,
  LinkView,
  PaginatedResponse,
  ApiResponse,
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

  async getLinkHistory(shortenUrl: string): Promise<LinkView[]> {
    const response = await api.get<ApiResponse<LinkView[]>>(
      `/view/links/${shortenUrl}`,
    );
    return response.data?.data || [];
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
