import {  AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { Routes,Route} from 'react-router-dom'
import Homepage from './pages/home/Homepage'
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage'
import MainLayout from './layouts/MainLayout'
import AlbumPage from './pages/album/AlbumPage'
import AdminPage from './pages/admin/AdminPage'
import { Toaster } from 'react-hot-toast'
import NotFound from './pages/404/NotFound'
import ChatPage from './pages/chat/ChatPage'
const App = () => {
  return (
    <>
    <Routes>
      
      <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
     <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
     <Route path="/admin" element={<AdminPage/>}/>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/albums/:albumId" element={<AlbumPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
