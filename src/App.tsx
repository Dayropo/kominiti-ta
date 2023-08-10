import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Employees from "./pages/Employees"


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Employees />} />
      </Route>
    </Routes>
  )
}

export default App
