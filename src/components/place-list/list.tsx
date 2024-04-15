"use client";

import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";

import { MapsPlaceResult } from "@/app/api/places/route";

import { MapModal } from "../modal/map-modal";
import { PlaceListItem } from "./list-item";

export interface PlaceListProps {
  places: MapsPlaceResult[];
  loadingState?: boolean;
  errorState?: boolean;
  notFoundState?: boolean;
}

export function PlaceList({
  places,
  loadingState,
  errorState,
  notFoundState,
}: PlaceListProps) {
  const [selectedPlace, setSelectedPlace] = useState<MapsPlaceResult | null>();

  return (
    <div>
      {loadingState ? (
        <p>Loading...</p>
      ) : errorState ? (
        <p>Error when finding places!</p>
      ) : notFoundState ? (
        <p>No places found!</p>
      ) : (
        <ul role="list" className="space-y-3">
          {places.map((place) => (
            <PlaceListItem
              key={place.place_id}
              place={place}
              setSelectedPlace={setSelectedPlace}
            />
          ))}
        </ul>
      )}

      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
        <MapModal
          place={selectedPlace}
          open={!!selectedPlace}
          close={() => setSelectedPlace(null)}
        />
      </LoadScript>
    </div>
  );
}
