import { Stack } from "expo-router";
import { AuthProvider,useAuth } from '../../providers/AuthProvider'
import { useEffect } from 'react'

const AuthLayout= ()=> {
    const { session, initialized } = useAuth()

    useEffect(() => {
        if (!initialized) return
    
      }, [session, initialized])

    return (
        <Stack />
    )
}

const RootLayout = () => {
    return (
      <AuthProvider>
        <AuthLayout />
      </AuthProvider>
    )
  }
  
  export default RootLayout