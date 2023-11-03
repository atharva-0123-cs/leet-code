'use client'
import {useState, useEffect} from 'react';
import { authModalState } from "../atom/authModalAtom";
import AuthModal from "../components/Modals/AuthModals";
import NavBar from "../components/NavBar/NavBar";
import { useRecoilValue } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from 'next/navigation';


const AuthPage = () => {

  const [user,loading,error] = useAuthState(auth);
  const [pageLoading,setPageLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    
    if(user) router.push('/');
    if(!loading && !user ) setPageLoading(false);
    
  },[user,loading,router])
  
  const authModal = useRecoilValue(authModalState);
  if(pageLoading) return null;
  

    return (

        <main className='bg-slate-800 h-screen '>
        <div className='max-w-7xl mx-auto '>
        <NavBar/>
        <div className='text-center'>
          <h1 className='text-4xl text-emerald-500'>
            Build your Logic Here,
          </h1>
          <p className='text-lg text-orange-500'>
            Solve the coding examples 
          </p>

          {authModal.isOpen && <AuthModal/>}
  
          {/* <Image
        src={imge}
        alt="Picture of the author"
        className=' mx-auto mt-4 h-96 rounded-lg'
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      /> */}
        </div>
        </div>
      </main>
        
    )
};

export default AuthPage;