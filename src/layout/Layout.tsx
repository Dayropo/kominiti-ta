import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className="min-h-screen relative">
      <Outlet />
    </main>
  )
}

export default Layout
