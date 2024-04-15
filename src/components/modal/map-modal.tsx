"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "next-themes";
import { Fragment } from "react";

import { MapsPlaceResult } from "@/app/api/places/route";
import { googleMapsDarkTheme } from "./theme";

export interface MapModalProps {
  open: boolean;
  close: () => void;
  place?: MapsPlaceResult | null;
}

export function MapModal({ open, close, place }: MapModalProps) {
  const { theme } = useTheme();

  if (!place) return null;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                    >
                      {place.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <GoogleMap
                        mapContainerStyle={{ height: "400px", width: "100%" }}
                        center={place.geometry.location}
                        zoom={16}
                        options={{
                          disableDefaultUI: true,
                          backgroundColor:
                            theme === "dark" ? "#000000" : "#f5f5f5",
                          styles:
                            theme === "dark" ? googleMapsDarkTheme : undefined,
                        }}
                      >
                        <Marker position={place.geometry.location} />
                      </GoogleMap>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-slate-900 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 sm:col-start-1 sm:mt-0"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
