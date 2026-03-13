import { useEffect, useState } from 'react'
import axios from 'axios'
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
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

import type { ReactElement, ChangeEvent } from 'react'
import type { AxiosResponse } from 'axios'
import type { ClientModel, UpdateClientModel } from '../ClientModel'

const { Title, Text } = Typography

interface ClientDetailsProps { 
  id: string 
}

interface SaleRecord {
  id: string
  date: string
  book: {
    id: string
    title: string
    author: { id: string; firstName: string; lastName: string }
  }
}

export function ClientDetails({ id }: ClientDetailsProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [client, setClient] = useState<ClientModel | null>(null)
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')

  const loadClient = (): void => {
    setIsLoading(true)
    axios.get<ClientModel>(`http://localhost:3000/clients/${id}`)
      .then((response: AxiosResponse<ClientModel>): void => {
        const data: ClientModel = response.data
        setClient(data)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email ?? '')
        setPhoto(data.photo ?? '')
      })
      .finally((): void => setIsLoading(false))
  }

  const loadSales = (): void => {
    axios.get<SaleRecord[]>(`http://localhost:3000/sales?clientId=${id}`)
      .then((response: AxiosResponse<SaleRecord[]>): void => {
        setSales(response.data)
      })
      .catch((err: unknown): void => {
        console.error("Erreur chargement ventes", err)
      })
  }

  useEffect((): void => {
    loadClient()
    loadSales()
  }, [id])

  const saveEdit = (): void => {
    const updateData: UpdateClientModel = { firstName, lastName, email, photo }
    axios.patch(`http://localhost:3000/clients/${id}`, updateData)
      .then((): void => { 
        loadClient()
        setIsEditing(false) 
      })
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  const bookColumns = [
    {
      title: 'Livre',
      key: 'title',
      render: (_: unknown, record: SaleRecord): ReactElement => (
        <Link to="/books/$bookId" params={{ bookId: record.book.id }} style={{ fontWeight: 500 }}>
          {record.book.title}
        </Link>
      ),
    },
    {
      title: 'Auteur',
      key: 'author',
      render: (_: unknown, record: SaleRecord): ReactElement => (
        <Link to="/authors/$authorId" params={{ authorId: record.book.author.id }}>
          {record.book.author.firstName} {record.book.author.lastName}
        </Link>
      ),
    },
    {
      title: "Date d'achat",
      dataIndex: 'date',
      key: 'date',
      render: (date: string): string => new Date(date).toLocaleDateString('fr-FR'),
    },
  ]

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 24 }} items={[
        { title: <Link to="/clients">Clients</Link> },
        { title: client ? `${client.firstName} ${client.lastName}` : '...' },
      ]} />

      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar size={80} src={client?.photo ?? undefined} icon={<UserOutlined />} />
          {isEditing ? (
            <Space direction="vertical" style={{ flex: 1 }}>
              <Input 
                value={firstName} 
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setFirstName(e.target.value)} 
                placeholder="Prénom" 
              />
              <Input 
                value={lastName} 
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setLastName(e.target.value)} 
                placeholder="Nom" 
              />
              <Input 
                value={email} 
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)} 
                placeholder="Email" 
              />
              <Input 
                value={photo} 
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setPhoto(e.target.value)} 
                placeholder="Photo URL" 
              />
              <Space>
                <Button type="primary" onClick={saveEdit}>Sauvegarder</Button>
                <Button onClick={(): void => setIsEditing(false)}>Annuler</Button>
              </Space>
            </Space>
          ) : (
            <div style={{ flex: 1 }}>
              <Title level={2} style={{ margin: 0 }}>
                {client?.firstName} {client?.lastName}
                <Button type="text" icon={<EditOutlined />} onClick={(): void => setIsEditing(true)} />
              </Title>
              {client?.email && <Text type="secondary">{client.email}</Text>}
            </div>
          )}
        </div>
      </Card>

      <Card title="Historique des achats" style={{ borderRadius: 12 }}>
        <Table<SaleRecord>
          dataSource={sales}
          columns={bookColumns}
          rowKey="id"
          pagination={false}
          locale={{ emptyText: "Ce client n'a pas encore effectué d'achats." }}
        />
      </Card>
    </div>
  )
}