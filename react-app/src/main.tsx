import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConfigProvider } from 'antd'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#4f46e5',
            colorBgContainer: '#ffffff',
            colorBgLayout: '#f0f2f5',
            borderRadius: 10,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            colorLink: '#4f46e5',
            colorLinkHover: '#6366f1',
            colorText: '#1a1a2e',
            colorTextSecondary: '#64748b',
          },
          components: {
            Menu: {
              itemBg: 'transparent',
              horizontalItemSelectedColor: '#ffffff',
              horizontalItemHoverColor: 'rgba(255,255,255,0.85)',
              itemColor: 'rgba(255,255,255,0.7)',
              horizontalItemSelectedBg: 'rgba(255,255,255,0.1)',
            },
            Button: {
              borderRadius: 8,
              controlHeight: 36,
            },
            Card: {
              borderRadiusLG: 12,
            },
            Input: {
              borderRadius: 8,
            },
            Modal: {
              borderRadiusLG: 16,
            },
            Table: {
              borderRadius: 12,
              headerBg: '#f8fafc',
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StrictMode>,
  )
}
