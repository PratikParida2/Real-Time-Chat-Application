import NavBar from './components/NavBar'
import {Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import authStore from './store/authStore'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import {ToastContainer} from 'react-toastify'
const App = () => {
  const {checkAuth,userAuth,isCheckingAuth}=authStore();
  console.log(userAuth);
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  if(isCheckingAuth && !userAuth)
 return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
 )
  return (
    <div>
      <ToastContainer/>
        <NavBar/>
        <Routes>
          <Route path='/' element={userAuth?<HomePage/>:<Navigate to={'/login'}/>}/>
          <Route path='/login' element={!userAuth?<LoginPage/>:<Navigate to={'/'}/>}/>
          <Route path='/register' element={!userAuth?<RegisterPage/>:<Navigate to={'/'}/>}/>
          <Route path='/profile' element={userAuth?<ProfilePage/>:<Navigate to={'/login'}/>}/>
        </Routes>
    </div>
  )
}

export default App