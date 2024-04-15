import { Dispatch, SetStateAction } from "react";

import {
  BookmarkIcon,
  BookmarkSlashIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import { MapsPlaceResult } from "@/app/api/places/route";
import { useBookmarksStore } from "@/stores/bookmarks";
import { Button } from "../button";

export interface PlaceListItemProps {
  place: MapsPlaceResult;
  setSelectedPlace: Dispatch<
    SetStateAction<MapsPlaceResult | null | undefined>
  >;
}

export function PlaceListItem({ place, setSelectedPlace }: PlaceListItemProps) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarksStore();

  const isBookmarked = (place: MapsPlaceResult) => {
    return !!bookmarks.find((bookmark) => bookmark.place_id === place.place_id);
  };

  const handleBookmark = (place: MapsPlaceResult) => {
    if (isBookmarked(place)) {
      removeBookmark(place);
      return;
    }
    addBookmark(place);
  };

  return (
    <li
      className="flex flex-col items-center space-y-2 md:flex-row md:justify-between overflow-hidden rounded-md bg-white dark:bg-slate-900 px-6 py-4 border border-gray-200 dark:border-gray-600 shadow"
      key={place.place_id}
    >
      <div>
        <h3 className="font-bold max-w-80 lg:max-w-full truncate">
          {place.name}
        </h3>
      </div>

      <div className="items-center space-x-2">
        <Button type="button" onClick={() => setSelectedPlace(place)}>
          <MapPinIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Open
        </Button>

        <Button type="button" onClick={() => handleBookmark(place)}>
          {isBookmarked(place) ? (
            <>
              <BookmarkSlashIcon
                className="-ml-0.5 h-5 w-5"
                aria-hidden="true"
              />
              Remove
            </>
          ) : (
            <>
              <BookmarkIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Bookmark
            </>
          )}
        </Button>
      </div>
    </li>
  );
}
