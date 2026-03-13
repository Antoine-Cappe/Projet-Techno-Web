import { useEffect, useState } from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Input,
  Skeleton,
  Space,
  Table,
  Typography,
} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import type { ClientModel, UpdateClientModel } from '../ClientModel'

interface ClientDetailsProps {
  id: string
}

interface SaleRecord {
  id: string
  date: string
  book: {
    id: string
    title: string
    author: {
      id: string
      firstName: string
      lastName: string
    }
  }
}

export function ClientDetails({ id }: ClientDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [client, setClient] = useState<ClientModel | null>(null)
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')

  const loadClient = () => {
    setIsLoading(true)
    axios
      .get<ClientModel>(`http://localhost:3000/clients/${id}`)
      .then(response => {
        setClient(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email ?? '')
        setPhoto(response.data.photo ?? '')
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const loadSales = () => {
    axios
      .get<SaleRecord[]>(`http://localhost:3000/sales?clientId=${id}`)
      .then(response => setSales(response.data))
      .catch(err => console.error(err))
  }

  const updateClient = (input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => loadClient())
      .catch(err => console.error(err))
  }

  const cancelEdit = () => {
    setFirstName(client?.firstName ?? '')
    setLastName(client?.lastName ?? '')
    setEmail(client?.email ?? '')
    setPhoto(client?.photo ?? '')
    setIsEditing(false)
  }

  const saveEdit = () => {
    updateClient({
      firstName,
      lastName,
      email: email || undefined,
      photo: photo || undefined,
    })
    setIsEditing(false)
  }

  useEffect(() => {
    loadClient()
    loadSales()
  }, [id])

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  const bookColumns = [
    {
      title: 'Livre',
      dataIndex: ['book', 'title'],
      key: 'title',
      render: (_: string, record: SaleRecord) => (
        <Link
          to="/books/$bookId"
          params={{ bookId: record.book.id }}
          style={{ fontWeight: 500 }}
        >
          {record.book.title}
        </Link>
      ),
    },
    {
      title: 'Auteur',
      key: 'author',
      render: (_: unknown, record: SaleRecord) => (
        <Link
          to="/authors/$authorId"
          params={{ authorId: record.book.author.id }}
        >
          {record.book.author.firstName} {record.book.author.lastName}
        </Link>
      ),
    },
    {
      title: "Date d'achat",
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
  ]

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link to="/clients">Clients</Link> },
          { title: client ? `${client.firstName} ${client.lastName}` : '...' },
        ]}
      />

      <Card
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar
            size={80}
            src={client?.photo}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#4f46e5',
              flexShrink: 0,
            }}
          />

          {isEditing ? (
            <Space direction="vertical" style={{ flex: 1 }}>
              <Input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                size="large"
              />
              <Input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom"
                size="large"
              />
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email (facultatif)"
                size="large"
              />
              <Input
                value={photo}
                onChange={e => setPhoto(e.target.value)}
                placeholder="Photo URL (facultatif)"
                size="large"
              />
              <Space>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={saveEdit}
                >
                  Sauvegarder
                </Button>
                <Button icon={<CloseOutlined />} onClick={cancelEdit}>
                  Annuler
                </Button>
              </Space>
            </Space>
          ) : (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {client?.firstName} {client?.lastName}
                </Typography.Title>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => setIsEditing(true)}
                  shape="circle"
                />
              </div>
              {client?.email && (
                <Typography.Text
                  type="secondary"
                  style={{ marginTop: 4, display: 'block' }}
                >
                  {client.email}
                </Typography.Text>
              )}
            </div>
          )}
        </div>
      </Card>

      <Card
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
        }}
      >
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Livres achetés
        </Typography.Title>
        <Table<SaleRecord>
          dataSource={sales}
          columns={bookColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}
