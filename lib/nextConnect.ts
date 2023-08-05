import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export const nextConnectRouter = () =>
  createRouter<NextApiRequest, NextApiResponse>();

export const nextConnectErrorHandler = (
  err: any,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).end(err.message);
};
