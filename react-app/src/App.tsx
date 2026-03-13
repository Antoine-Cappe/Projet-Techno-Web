import { Card, Col, Row, Typography } from 'antd'
import { BookOutlined, UserOutlined, TeamOutlined, RocketOutlined, ShoppingOutlined } from '@ant-design/icons'
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
          Bienvenue à la bibliothèque de Babel
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
          Gérez votre collection de livres, d'auteurs, de clients et de ventes en un seul endroit.
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
                Livres
              </Title>
              <Paragraph style={{ color: '#64748b', marginTop: 8, marginBottom: 0 }}>
                Parcourez, ajoutez et gérez votre collection de livres avec des opérations CRUD complètes.
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
                Auteurs
              </Title>
              <Paragraph style={{ color: '#64748b', marginTop: 8, marginBottom: 0 }}>
                Consultez les profils des auteurs, leurs œuvres publiées et les statistiques de vente.
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
                Gérez votre base de données de clients et suivez leurs préférences de lecture.
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
              C'est parti !
            </Title>
            <Paragraph style={{ color: '#64748b', margin: 0 }}>
              Sélectionnez une section ci-dessus pour commencer à gérer votre bibliothèque. Utilisez la barre de navigation pour basculer entre les sections à tout moment.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default App
