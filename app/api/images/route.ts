import { data } from "@/data.js";

export const GET = () => {
  return Response.json({
    data: data,
  });
};
