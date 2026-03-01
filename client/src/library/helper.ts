export const constructShortUrl = (shortenUrl: string) => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
  return `${baseUrl}/api/lnk/get/${shortenUrl}`;
};
export const formatDateTime = (dateString: string) =>
  new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
