import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

import { MapsPlaceResult } from "@/app/api/places/route";

export interface BookmarksState {
  bookmarks: MapsPlaceResult[];
  addBookmark: (bookmarks: MapsPlaceResult) => void;
  removeBookmark: (bookmarks: MapsPlaceResult) => void;
  resetBookmarks: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  devtools(
    persist(
      (set) => ({
        bookmarks: [],
        addBookmark: (bookmark: MapsPlaceResult) =>
          set((state: BookmarksState) => ({
            bookmarks: [...state.bookmarks, bookmark],
          })),
        removeBookmark: (bookmark: MapsPlaceResult) =>
          set((state: BookmarksState) => ({
            bookmarks: [
              ...state.bookmarks.filter(
                (b) => b.place_id !== bookmark.place_id
              ),
            ],
          })),
        resetBookmarks: () => set({ bookmarks: [] }),
      }),
      { name: "@citifyd-challenge:bookmarks" }
    )
  )
);
