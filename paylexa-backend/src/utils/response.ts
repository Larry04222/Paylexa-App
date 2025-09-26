export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const createResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  data,
  message,
});
