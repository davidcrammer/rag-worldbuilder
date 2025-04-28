import { FC } from "react"
import { MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/16/solid"

const Header: FC = ({}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="font-bold">New Caspian</h1>
      <div
        className="
        w-full max-w-[600px]
        border border-neutral-500 rounded-full
        flex gap-2 items-center
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1
        "
      >
        <label htmlFor="search" className="pl-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-neutral-500" />
        </label>

        <input id="search" name="search" type="text" placeholder="Search" className="w-full px-2 py-2 rounded-full outline-none" />
      </div>
      <button className="flex gap-2 items-center cursor-pointer bg-neutral-200 rounded px-2 py-1 border border-neutral-300">
        <ArrowPathIcon className="w-5 h-5 text-neutral-700" />
        Random Post
      </button>
    </div>
  )
}

export default Header
