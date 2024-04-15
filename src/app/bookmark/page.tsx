"use client";

import { useState } from "react";

import { useBookmarksStore } from "@/stores/bookmarks";
import { MainLayout } from "@/layouts";

import { PlaceList } from "@/components/place-list/list";
import { Input } from "@/components/input";

export default function Home() {
  const { bookmarks } = useBookmarksStore();
  const [search, setSearch] = useState("");

  return (
    <MainLayout>
      <div className="flex justify-center items-center space-x-4">
        <h3 className="font-bold text-lg">Bookmarks</h3>

        <div className="sm:w-96">
          <Input
            id="query"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Filter by name"
          />
        </div>
      </div>

      <div className="mt-3 sm:mx-20">
        <PlaceList
          places={bookmarks.filter((b) =>
            search !== ""
              ? b.name.toLowerCase().includes(search.toLowerCase())
              : true
          )}
        />
      </div>
    </MainLayout>
  );
}
