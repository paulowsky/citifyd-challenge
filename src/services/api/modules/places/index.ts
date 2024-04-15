import { MapsPlaceResult } from "@/app/api/places/route";

import { ApiError, HttpResponse } from "../../http";
import { apiRequest } from "../../http/api";

export async function getPlaces(
  query: string
): Promise<HttpResponse<MapsPlaceResult[]>> {
  try {
    return apiRequest<MapsPlaceResult[]>({
      method: "GET",
      url: `/api/places?query=${query}`,
    });
  } catch (err: any) {
    throw new ApiError(err.statusCode, err.message, err.data);
  }
}
