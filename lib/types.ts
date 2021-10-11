export type ApiResponse = {
  data: {
    [key: string]: any;
  } | null;
};

export type ApiError = {
  error: {
    status: number;
    message: string;
  };
};
