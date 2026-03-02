import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bulma/css/bulma.min.css'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //Length of time data stays fresh before refetching(5 min) 
      staleTime: 1000 * 60 * 5,
      //Length of time unused data stays in cache(5 min)
      cacheTime: 1000 * 60 * 5,
      //Refetch when user returns to window/tab
      refetchOnWindowFocus: true,
      //Retry failed requests up to 3 times
      retry: 3,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
