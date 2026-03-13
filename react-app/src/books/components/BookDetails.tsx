import { 
  Breadcrumb, 
  Card, 
  Skeleton, 
  Tag, 
  Typography, 
  Button, 
  Modal, 
  Select, 
  DatePicker, 
  List, 
  Avatar, 
  Space, 
  Divider, 
  Empty 
} from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'
import { useEffect, useState } from 'react'
import { 
  CalendarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  EditOutlined 
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import dayjs from 'dayjs'

const { Title, Text } = Typography

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, sales, loadBook, updateBook, recordSale } = useBookDetailsProvider(id)
  const { clients } = useClientProvider()
  const { authors, loadAuthors } = useBookAuthorsProviders()
  
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [purchaseDate, setPurchaseDate] = useState<string>(dayjs().toISOString())

  useEffect(() => {
    loadBook()
    loadAuthors()
  }, [id])

  if (isLoading || !book) {
    return <Skeleton active paragraph={{ rows: 10 }} />
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link to="/books">Livres</Link> },
          { title: book.title },
        ]}
      />

      <Card 
        style={{ borderRadius: 12, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Section Image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <img
              src={book.photoUrl || 'https://via.placeholder.com/200x300?text=No+Cover'}
              alt={book.title}
              style={{ 
                width: 200, 
                borderRadius: 8, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                objectFit: 'cover' 
              }}
            />
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => {
                const newUrl = prompt("Collez l'URL de la nouvelle image :", book.photoUrl || "");
                if (newUrl !== null) updateBook({ photoUrl: newUrl });
              }}
            >
              Changer la couverture
            </Button>
          </div>

          {/* Section Informations */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <Title 
                  level={2} 
                  editable={{ onChange: (val) => updateBook({ title: val }) }} 
                  style={{ margin: 0 }}
                >
                  {book.title}
                </Title>
                
                <Space size="middle" style={{ marginTop: 16 }}>
                  <Tag icon={<CalendarOutlined />} color="blue" style={{ padding: '4px 8px', borderRadius: 6 }}>
                    Année : 
                    <Text 
                      editable={{ onChange: (val) => updateBook({ yearPublished: parseInt(val) || 0 }) }}
                      style={{ marginLeft: 8, fontWeight: 'bold' }}
                    >
                      {book.yearPublished.toString()}
                    </Text>
                  </Tag>
                </Space>
              </div>

              <Button 
                type="primary" 
                size="large"
                icon={<ShoppingCartOutlined />} 
                onClick={() => setIsPurchaseModalOpen(true)}
                style={{ borderRadius: 8 }}
              >
                Enregistrer un achat
              </Button>
            </div>
            
            <Divider />
            
            <Title level={4}><UserOutlined /> Auteur</Title>
            <Select
              style={{ width: '100%', maxWidth: 400 }}
              value={book.author?.id}
              onChange={(authorId) => updateBook({ authorId })}
              options={authors.map(a => ({ 
                label: `${a.firstName} ${a.lastName}`, 
                value: a.id 
              }))}
              showSearch
              placeholder="Sélectionner un auteur"
              filterOption={(input, option) => 
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />

            <Divider />

            {/* Liste des acheteurs avec Navigation corrigée */}
            <Title level={4}><ShoppingCartOutlined /> Clients ayant acheté ce livre</Title>
            <List
              itemLayout="horizontal"
              dataSource={sales || []}
              renderItem={(sale) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        src={sale.client?.photo} 
                        icon={<UserOutlined />} 
                        style={{ backgroundColor: '#f0f2f5' }}
                      />
                    }
                    title={
                      /* Navigation vers la fiche client */
                      <Link to="/clients/$clientId" params={{ clientId: sale.client?.id }}>
                        <Text strong style={{ color: '#1890ff', cursor: 'pointer' }}>
                          {sale.client?.firstName} {sale.client?.lastName}
                        </Text>
                      </Link>
                    }
                    description={
                      <Space>
                        <CalendarOutlined />
                        {dayjs(sale.date).format('DD MMMM YYYY [à] HH:mm')}
                      </Space>
                    }
                  />
                </List.Item>
              )}
              locale={{ 
                emptyText: <Empty description="Aucun achat enregistré pour ce livre" /> 
              }}
              style={{ maxHeight: '400px', overflowY: 'auto' }}
            />
          </div>
        </div>
      </Card>

      <Modal
        title="Nouvel achat"
        open={isPurchaseModalOpen}
        onOk={() => {
          if (selectedClientId) {
            recordSale(selectedClientId, purchaseDate)
            setIsPurchaseModalOpen(false)
            setSelectedClientId(null)
          }
        }}
        onCancel={() => setIsPurchaseModalOpen(false)}
        okText="Valider l'achat"
        cancelText="Annuler"
        destroyOnClose
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size="large">
          <div>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Client acheteur :</Text>
            <Select
              style={{ width: '100%' }}
              placeholder="Rechercher un client..."
              onChange={setSelectedClientId}
              options={clients.map(c => ({ 
                label: `${c.firstName} ${c.lastName} (${c.email || 'Pas d\'email'})`, 
                value: c.id 
              }))}
              showSearch
              filterOption={(input, option) => 
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Date de la transaction :</Text>
            <DatePicker 
              style={{ width: '100%' }} 
              showTime
              defaultValue={dayjs()} 
              onChange={(date) => setPurchaseDate(date?.toISOString() || dayjs().toISOString())}
            />
          </div>
        </Space>
      </Modal>
    </div>
  )
}