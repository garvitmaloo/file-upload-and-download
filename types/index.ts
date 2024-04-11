export interface StandardResponse<T> {
  error: {
    statusCode: number;
    message: string;
  } | null;
  result: T | null;
}
