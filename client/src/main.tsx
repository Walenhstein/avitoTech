import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AdsListPage from './pages/AdsListPage'
import { AdDetailsPage } from './pages/AdDetailsPage'
import AdEditPage from './pages/AdEditPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'

import './index.css'
import '@mantine/core/styles.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

const router = createBrowserRouter([
  {
    path:'/',
    element: <Navigate to='/ads' replace />
  },
  {
    path:'/ads',
    element: <AdsListPage />
  },
  {
    path: '/ads/:id',
    element: <AdDetailsPage />
  },
  {
    path: '/ads/:id/edit',
    element: <AdEditPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
