export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export function successResponse(message: string, data?: any): ApiResponse {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse(message: string, error?: string): ApiResponse {
  return {
    success: false,
    message,
    error,
  };
}
