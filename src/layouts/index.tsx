"use client";

import { useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

import { ThemeSelector } from "@/components/theme-selector";

export function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigation = [
    { name: "Places", href: "/" },
    { name: "Bookmarks", href: "/bookmark" },
  ];

  return (
    <>
      <header className="bg-indigo-600 dark:bg-indigo-800">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 sm:px-8"
          aria-label="Global"
        >
          <div className="flex sm:flex-1 text-white font-bold">
            <h1>Places APP</h1>
          </div>

          <div className="flex sm:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-indigo-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden sm:flex sm:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </a>
            ))}

            <ThemeSelector />
          </div>
        </nav>

        <Dialog
          as="div"
          className="sm:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <div className="-m-1.5 p-1.5 text-gray-900 dark:text-gray-100 font-bold">
                <h1>Places APP</h1>
              </div>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {item.name}
                    </a>
                  ))}

                  <ThemeSelector />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="mt-6 mx-2 pb-10">{children}</main>
    </>
  );
}
