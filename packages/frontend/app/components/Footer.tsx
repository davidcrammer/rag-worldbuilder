import { FC } from "react"

const Footer: FC = ({}) => {
  return (
    <div className="text-xs">
      © {} {new Date().getFullYear()} | Made by David Crammer
    </div>
  )
}

export default Footer
