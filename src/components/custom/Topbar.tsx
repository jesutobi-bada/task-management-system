import { Notification } from "iconsax-reactjs"

const Topbar = () => {
  return (
    <nav>
      <div className="flex items-center justify-between h-16 px-2 border-b border-primary">
        <h1 className="text-lg font-semibold">My Application</h1>
        <div className="flex items-center space-x-4">
          <Notification size={20} />
        </div>
      </div>
    </nav>
  )
}

export default Topbar

// TODO: Complete this 