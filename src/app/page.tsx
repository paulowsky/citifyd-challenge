"use client";

import { set, useForm } from "react-hook-form";
import { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { MapsPlaceResult } from "./api/places/route";

import { PlaceList } from "@/components/place-list/list";
import { inputStyleClasses } from "@/components/input";
import { Button } from "@/components/button";
import { MainLayout } from "@/layouts";
import { getPlaces } from "@/services/api/modules/places";

export interface SearchData {
  query: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<SearchData>();

  const [places, setPlaces] = useState<MapsPlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);

  const searchPlaces = async ({ query }: SearchData) => {
    try {
      setLoading(true);
      const res = await getPlaces(query);
      if (res.body?.length) {
        setPlaces(res.body);
        setEmpty(false);
      } else {
        setPlaces([]);
        setEmpty(true);
      }
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      console.error("ERROR FETCHING GOOGLE API: ", err);
    }
  };

  const onSubmit = (data: SearchData) => {
    searchPlaces(data);
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-x-2 flex sm:w-96">
            <input
              id="query"
              type="text"
              {...register("query", { required: true })}
              className={inputStyleClasses}
              placeholder="Search by name, address, type..."
            />

            <Button type="submit">
              <MagnifyingGlassIcon
                className="-ml-0.5 h-5 w-5"
                aria-hidden="true"
              />
              Search
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-3 sm:mx-20">
        <PlaceList
          loadingState={loading}
          notFoundState={empty}
          errorState={error}
          places={places}
        />
      </div>
    </MainLayout>
  );
}
