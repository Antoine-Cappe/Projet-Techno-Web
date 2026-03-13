import { createFileRoute } from '@tanstack/react-router'
import { Card, Col, Row, Typography, Tag } from 'antd'
import {
  CodeOutlined,
  ApiOutlined,
  DatabaseOutlined,
  GithubOutlined,
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const techStack = [
    { name: 'React 19', color: '#61dafb', icon: <CodeOutlined /> },
    { name: 'TypeScript', color: '#3178c6', icon: <CodeOutlined /> },
    { name: 'Ant Design', color: '#1677ff', icon: <CodeOutlined /> },
    { name: 'TanStack Router', color: '#ef4444', icon: <ApiOutlined /> },
    { name: 'Vite', color: '#646cff', icon: <CodeOutlined /> },
    { name: 'Axios', color: '#5a29e4', icon: <ApiOutlined /> },
  ]

  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
          borderRadius: 16,
          padding: '48px 40px',
          marginBottom: 32,
          color: '#fff',
        }}
      >
        <Title style={{ color: '#fff', margin: 0, fontSize: 32 }}>
          About Babel&apos;s Library
        </Title>
        <Paragraph
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 16,
            marginTop: 12,
            marginBottom: 0,
            maxWidth: 600,
          }}
        >
          A modern library management application built as a web technologies
          project.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background:
                    'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <DatabaseOutlined style={{ fontSize: 18, color: '#fff' }} />
              </div>
              <Title level={4} style={{ margin: 0 }}>
                Features
              </Title>
            </div>
            <ul
              style={{
                color: '#475569',
                lineHeight: 2.2,
                paddingLeft: 20,
                margin: 0,
              }}
            >
              <li>Full CRUD operations for books and authors</li>
              <li>Author profiles with photo and sales statistics</li>
              <li>Inline editing with real-time updates</li>
              <li>Type-safe routing with TanStack Router</li>
              <li>Responsive design with Ant Design components</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            style={{
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background:
                    'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GithubOutlined style={{ fontSize: 18, color: '#fff' }} />
              </div>
              <Title level={4} style={{ margin: 0 }}>
                Tech Stack
              </Title>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {techStack.map(tech => (
                <Tag
                  key={tech.name}
                  icon={tech.icon}
                  color={tech.color}
                  style={{
                    padding: '6px 14px',
                    fontSize: 14,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {tech.name}
                </Tag>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
