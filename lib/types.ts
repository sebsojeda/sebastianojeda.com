export type ApiResponse = {
  data: {
    attributes: {
      [key: string]: any;
    };
  }[];
};

export type ApiError = {
  errors: {
    status: number;
    message: string;
  }[];
};
