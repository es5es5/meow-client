import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoomList from './views/room/RoomList'
import Home from './components/Home'
import RoomDetail from './views/room/RoomDetail'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/room" element={<RoomList />} />
          <Route path="/room/detail/:roomId" element={<RoomDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
