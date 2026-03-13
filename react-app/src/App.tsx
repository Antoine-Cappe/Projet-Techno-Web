import { Card, Col, Row, Typography } from 'antd'
import { BookOutlined, UserOutlined, TeamOutlined, RocketOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

const { Title, Paragraph } = Typography

function App() {
  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 16,
          padding: '48px 40px',
          marginBottom: 32,
          color: '#fff',
        }}
      >
        <Title style={{ color: '#fff', margin: 0, fontSize: 36 }}>
          Welcome to Babel&apos;s Library
        </Title>
        <Paragraph
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 18,
            marginTop: 12,
            marginBottom: 0,
            maxWidth: 600,
          }}
        >
          Manage your collection of books, authors, and clients in one place.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Link to="/books">
            <Card
              hoverable
              style={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <BookOutlined style={{ fontSize: 22, color: '#fff' }} />
              </div>
              <Title level={4} style={{ margin: 0 }}>
                Books
              </Title>
              <Paragraph style={{ color: '#64748b', marginTop: 8, marginBottom: 0 }}>
                Browse, add, and manage your book collection with full CRUD operations.
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link to="/authors">
            <Card
              hoverable
              style={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <UserOutlined style={{ fontSize: 22, color: '#fff' }} />
              </div>
              <Title level={4} style={{ margin: 0 }}>
                Authors
              </Title>
              <Paragraph style={{ color: '#64748b', marginTop: 8, marginBottom: 0 }}>
                View author profiles, their published works, and sales statistics.
              </Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Link to="/clients">
            <Card
              hoverable
              style={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                height: '100%',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <TeamOutlined style={{ fontSize: 22, color: '#fff' }} />
              </div>
              <Title level={4} style={{ margin: 0 }}>
                Clients
              </Title>
              <Paragraph style={{ color: '#64748b', marginTop: 8, marginBottom: 0 }}>
                Manage your client database and track their reading preferences.
              </Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>

      <Card
        style={{
          marginTop: 32,
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <RocketOutlined style={{ fontSize: 24, color: '#4f46e5' }} />
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Getting Started
            </Title>
            <Paragraph style={{ color: '#64748b', margin: 0 }}>
              Select a section above to start managing your library. Use the navigation bar to switch between sections at any time.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
