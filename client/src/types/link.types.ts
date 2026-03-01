export interface User {
  userName: string;
  firstName: string;
  lastName: string;
}

export interface Link {
  _id: string;
  originalUrl: string;
  shortenUrl: string;
  createdAt: string;
  updatedAt: string;
  userName: string;
}

export interface LinkView {
  _id: string;
  linkId: string;
  country: string;
  regionName: string;
  city: string;
  metadata: {
    type: string;
    app: string;
    deviceType: string;
    os: string;
    platform: string;
  };
  timezone: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  links?: T[];
  views?: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error: string | null;
}
