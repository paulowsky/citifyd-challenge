import { NextRequest, NextResponse } from "next/server";

export interface MapsPlaceResult {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const params = req.nextUrl.searchParams;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const mapsApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${params}&key=${apiKey}`;

    const response = await fetch(mapsApiUrl);
    const data = await response.json();
    return Response.json(data.results, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
