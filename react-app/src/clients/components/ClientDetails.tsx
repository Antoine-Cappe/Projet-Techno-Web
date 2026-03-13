import { useEffect, useState } from 'react'
import { Avatar, Breadcrumb, Button, Card, Input, Skeleton, Space, Table, Typography } from 'antd'
import { CheckOutlined, CloseOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import type { ClientModel, UpdateClientModel } from '../ClientModel'

interface ClientDetailsProps { id: string }

interface SaleRecord {
  id: string
  date: string
  book: {
    id: string
    title: string
    author: { id: string; firstName: string; lastName: string }
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
    axios.get<ClientModel>(`http://localhost:3000/clients/${id}`)
      .then(res => {
        setClient(res.data); setFirstName(res.data.firstName);
        setLastName(res.data.lastName); setEmail(res.data.email ?? '');
        setPhoto(res.data.photo ?? '');
      })
      .finally(() => setIsLoading(false))
  }

  const loadSales = () => {
    // Note: On filtre par clientId dans l'URL
    axios.get<SaleRecord[]>(`http://localhost:3000/sales?clientId=${id}`)
      .then(res => setSales(res.data))
  }

  useEffect(() => { loadClient(); loadSales(); }, [id])

  const saveEdit = () => {
    axios.patch(`http://localhost:3000/clients/${id}`, { firstName, lastName, email, photo })
      .then(() => { loadClient(); setIsEditing(false); })
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 24 }} items={[
        { title: <Link to="/clients">Clients</Link> },
        { title: client ? `${client.firstName} ${client.lastName}` : '...' },
      ]} />

      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Space size={20} align="start">
          <Avatar size={80} src={client?.photo} icon={<UserOutlined />} />
          {isEditing ? (
            <Space direction="vertical">
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" />
              <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" />
              <Space><Button type="primary" onClick={saveEdit}>Sauvegarder</Button>
              <Button onClick={() => setIsEditing(false)}>Annuler</Button></Space>
            </Space>
          ) : (
            <div>
              <Title level={2} style={{ margin: 0 }}>{client?.firstName} {client?.lastName} 
                <Button type="text" icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
              </Title>
              <Text type="secondary">{client?.email}</Text>
            </div>
          )}
        </Space>
      </Card>

      <Card title="Livres achetés">
        <Table dataSource={sales} rowKey="id" pagination={false} columns={[
          { title: 'Livre', render: (text, record) => <Link to="/books/$bookId" params={{bookId: record.book.id}}>{record.book.title}</Link> },
          { title: 'Auteur', render: (text, record) => `${record.book.author.firstName} ${record.book.author.lastName}` },
          { title: "Date d'achat", dataIndex: 'date', render: d => new Date(d).toLocaleDateString() },
        ]} />
      </Card>
    </div>
  )
}
const { Title, Text } = Typography;