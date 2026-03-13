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

const { Title, Text } = Typography

interface ClientDetailsProps { id: string }

// Définition de la structure d'une vente pour le tableau
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
  const [sales, setSales] = useState<SaleRecord[]>([]) // État pour les achats
  const [isEditing, setIsEditing] = useState(false)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')

  const loadClient = () => {
    setIsLoading(true)
    axios.get<ClientModel>(`http://localhost:3000/clients/${id}`)
      .then(response => {
        setClient(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email ?? '')
        setPhoto(response.data.photo ?? '')
      })
      .finally(() => setIsLoading(false))
  }

  // AJOUT : Charger les achats du client
  const loadSales = () => {
    axios.get<SaleRecord[]>(`http://localhost:3000/sales?clientId=${id}`)
      .then(response => setSales(response.data))
      .catch(err => console.error("Erreur chargement ventes", err))
  }

  useEffect(() => {
    loadClient()
    loadSales() // On charge les deux au montage
  }, [id])

  const saveEdit = () => {
    axios.patch(`http://localhost:3000/clients/${id}`, { firstName, lastName, email, photo })
      .then(() => { loadClient(); setIsEditing(false); })
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  // Définition des colonnes du tableau des achats
  const bookColumns = [
    {
      title: 'Livre',
      key: 'title',
      render: (_: any, record: SaleRecord) => (
        <Link to="/books/$bookId" params={{ bookId: record.book.id }} style={{ fontWeight: 500 }}>
          {record.book.title}
        </Link>
      ),
    },
    {
      title: 'Auteur',
      key: 'author',
      render: (_: any, record: SaleRecord) => (
        <Link to="/authors/$authorId" params={{ authorId: record.book.author.id }}>
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
      <Breadcrumb style={{ marginBottom: 24 }} items={[
        { title: <Link to="/clients">Clients</Link> },
        { title: client ? `${client.firstName} ${client.lastName}` : '...' },
      ]} />

      {/* Carte de Profil */}
      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar size={80} src={client?.photo} icon={<UserOutlined />} />
          {isEditing ? (
            <Space direction="vertical" style={{ flex: 1 }}>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Prénom" />
              <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Nom" />
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              <Input value={photo} onChange={e => setPhoto(e.target.value)} placeholder="Photo URL" />
              <Space>
                <Button type="primary" onClick={saveEdit}>Sauvegarder</Button>
                <Button onClick={() => setIsEditing(false)}>Annuler</Button>
              </Space>
            </Space>
          ) : (
            <div style={{ flex: 1 }}>
              <Title level={2} style={{ margin: 0 }}>
                {client?.firstName} {client?.lastName}
                <Button type="text" icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
              </Title>
              {client?.email && <Text type="secondary">{client.email}</Text>}
            </div>
          )}
        </div>
      </Card>

      {/* AJOUT : Tableau des Achats */}
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