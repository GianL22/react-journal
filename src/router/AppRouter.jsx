import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../auth'
import { useCheckoAuth } from '../hooks'
import { JournalRoutes } from '../journal'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {

  const status = useCheckoAuth()

  if (status === 'checking') return <CheckingAuth />

  return (
    <Routes>
        {
          (status === 'authenticated') ? 
            <Route path="/*" element={<JournalRoutes/>}/>
          :
            <Route path="/auth/*" element={<AuthRoutes/>}/>
        }

        <Route path="/*" element={<Navigate to="/auth/login" />} />

        {/* Login y registro */}
        {/* JournalAPp */}
    </Routes>
  )
}