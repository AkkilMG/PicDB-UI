"use client"

import { useState, Fragment } from "react"
import {
  PhotoIcon as ImageIcon,
  TrashIcon,
  StarIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { Dialog, Transition } from "@headlessui/react"

export default function MainDashboardList({ text, data, setId, deleteList}: { text: any; data: any; setId: any; deleteList: any; }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const openModal = (id: string) => {
    setSelectedId(id)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedId(null)
  }

  const confirmDelete = () => {
    if (selectedId) deleteList(selectedId)
    closeModal()
  }

  const formatFileSize = (size: number) => {
    if (size >= 1073741824) return (size / 1073741824).toFixed(2) + " GB"
    else if (size >= 1048576) return (size / 1048576).toFixed(2) + " MB"
    else if (size >= 1024) return (size / 1024).toFixed(2) + " KB"
    else return size + " bytes"
  }

  const GridView = () => ( 
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-x-auto w-full max-h-60 sm:max-h-58 pr-2 overflow-y-auto mr-6 scrollbar" style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
      {data.length > 0 ? (
        data.map((file: any, index: number) => (
          <div key={index} className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => setId(file["id"])}>
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                {file.link ? (
                  <>
                    <img src={file.link} alt={file.title} style={{ display: "block" }} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onLoad={e => {
                        const icon = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
                        if (icon) icon.style.display = "none"
                      }}
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = "none"
                        const icon = (e.target as HTMLImageElement).nextElementSibling as HTMLElement
                        if (icon) icon.style.display = "block"
                      }}
                    />
                    <ImageIcon className="h-12 w-12 text-blue-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  </>
                ) : (
                  <ImageIcon className="h-12 w-12 text-blue-400" />
                )}
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button onClick={(e) => { e.stopPropagation(); openModal(file["id"]); }} className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors" >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Favorite Badge */}
              {file.favorite && (
                <div className="absolute top-2 right-2">
                  <StarIcon className="h-5 w-5 fill-amber-400 stroke-amber-500" />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="p-3">
              <h3 className="font-medium text-gray-900 text-sm truncate mb-1">{file.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="uppercase font-medium">{file.type.split("/").pop()}</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
          <ImageIcon className="h-16 w-16 mb-4 text-gray-300" />
          <p className="text-lg font-medium">{text.list.noImage}</p>
        </div>
      )}
    </div>
  )

  const ListView = () => (
    <div className="overflow-x-auto w-full max-h-60 sm:max-h-72 pr-2 overflow-y-auto mr-1 scrollbar" style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-1 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
              {text.list.name}
            </th>
            <th scope="col" className="px-1 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
              {text.list.type}
            </th>
            <th scope="col" className="px-1 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> 
              {text.list.fileSize}
            </th>
            <th scope="col" className="relative px-1 xl:px-6 py-3"> <span className="sr-only">{text.list.edit}</span>
            </th>
          </tr>
        </thead>
        <tbody className="cursor-pointer bg-white divide-y divide-gray-300">
          {data.length > 0 ? (
            data.map((file: any, index: number) => (
              <tr key={index} onClick={() => setId(file["id"])} className="hover:bg-gray-50 transition-colors">
                <td className="px-1 xl:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 mr-3"> {file.url ? (
                        <img src={file.url || "/placeholder.svg"} alt={file.title} className="h-8 w-8 rounded object-cover" />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {file.title.length > (window.innerWidth < 640 ? 10 : 30)
                          ? file.title.substring(0, window.innerWidth < 640 ? 10 : 30) + "..."
                          : file.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-1 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-500 uppercase">
                  {file.type.split("/").pop()}
                </td>
                <td className="px-1 xl:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFileSize(file.size)}
                </td>
                <td onClick={(e) => { e.stopPropagation(); openModal(file["id"]); }} className="pl-1 pr-14- py-4 whitespace-nowrap text-right text-sm font-medium" >
                  <button className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-3 xl:px-6 py-4 text-center bg-gray-50 text-gray-600">
                {text.list.noImage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <section>
        {/* Header with View Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">{text.trash.title}</h2>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ListBulletIcon className="h-4 w-4 mr-2" />
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Squares2X2Icon className="h-4 w-4 mr-2" />
              Grid
            </button>
          </div>
        </div>

        {/* Content based on view mode */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {viewMode === "list" ? <ListView /> : <GridView />}
        </div>
      </section>
      
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95" >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                  Confirm Permanent Deletion
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this image permanently for managing? This action cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="button" className="inline-flex justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    </>
  )
}
