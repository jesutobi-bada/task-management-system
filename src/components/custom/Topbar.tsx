import { Notification } from "iconsax-reactjs"

const Topbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between h-18 px-4 border-b border-primary">
        <h1 className="text-lg font-semibold">My Application</h1>
        <div className="flex items-center space-x-4">
          <Notification size={24} />
        </div>
      </div>
    </nav>
  )
}

export default Topbar

// TODO: Complete this 