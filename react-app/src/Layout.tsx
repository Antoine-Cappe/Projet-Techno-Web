import {
  BookOutlined,
  HomeOutlined,
  InfoOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Layout as AntLayout, Menu } from 'antd'
import type { ReactNode } from 'react'
import { Link, useRouter } from '@tanstack/react-router'

interface LayoutProps {
  children: ReactNode
}

const { Header, Content } = AntLayout

export function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = router.state.location.pathname

  const items = [
    { label: <Link to="/">Home</Link>, key: '/', icon: <HomeOutlined /> },
    { label: <Link to="/books">Books</Link>, key: '/books', icon: <BookOutlined /> },
    { label: <Link to="/authors">Authors</Link>, key: '/authors', icon: <UserOutlined /> },
    { label: <Link to="/clients">Clients</Link>, key: '/clients', icon: <TeamOutlined /> },
    { label: <Link to="/about">About</Link>, key: '/about', icon: <InfoOutlined /> },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 64,
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 40 }}>
          <BookOutlined style={{ fontSize: 24, color: '#fff' }} />
          <span
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
            }}
          >
            Babel&apos;s Library
          </span>
        </Link>
        <Menu
          mode="horizontal"
          items={items}
          selectedKeys={[pathname]}
          style={{
            flex: 1,
            background: 'transparent',
            borderBottom: 'none',
            fontSize: 14,
            fontWeight: 500,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '32px 48px',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {children}
      </Content>
    </AntLayout>
  )
}
