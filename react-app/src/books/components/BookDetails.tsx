import { useEffect, useState } from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import {
  BookOutlined,
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import type { ClientModel } from '../../clients/ClientModel'
import type { UpdateBookModel } from '../BookModel'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

const { Title } = Typography

interface BookDetailsProps {
  id: string
}

interface BookSaleRecord {
  id: string
  date: string
  client: {
    id: string
    firstName: string
    lastName: string
    email?: string | null
    photo?: string | null
  }
}

export function BookDetails({ id }: BookDetailsProps) {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const [sales, setSales] = useState<BookSaleRecord[]>([])
  const [clients, setClients] = useState<ClientModel[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editYear, setEditYear] = useState<number>(0)
  const [editPhotoUrl, setEditPhotoUrl] = useState<string>('')
  const [editAuthorId, setEditAuthorId] = useState<string>('')
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const loadSales = (): void => {
    axios
      .get<BookSaleRecord[]>(`http://localhost:3000/sales?bookId=${id}`)
      .then(response => setSales(response.data))
      .catch(err => console.error(err))
  }

  const loadClients = (): void => {
    axios
      .get<ClientModel[]>('http://localhost:3000/clients')
      .then(response => setClients(response.data))
      .catch(err => console.error(err))
  }

  const createSale = (): void => {
    if (!selectedClientId || !selectedDate) return
    axios
      .post('http://localhost:3000/sales', {
        clientId: selectedClientId,
        bookId: id,
        date: selectedDate,
      })
      .then(() => {
        loadSales()
        setIsModalOpen(false)
        setSelectedClientId(null)
        setSelectedDate(null)
      })
      .catch(err => console.error(err))
  }

  const startEdit = (): void => {
    if (!book) return
    setEditTitle(book.title)
    setEditYear(book.yearPublished)
    setEditPhotoUrl(book.photoUrl ?? '')
    setEditAuthorId(book.author.id)
    loadAuthors()
    setIsEditing(true)
  }

  const cancelEdit = (): void => {
    setIsEditing(false)
  }

  const saveEdit = (): void => {
    const input: UpdateBookModel = {
      title: editTitle,
      yearPublished: editYear,
      photoUrl: editPhotoUrl || undefined,
      authorId: editAuthorId,
    }
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBook()
        setIsEditing(false)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    loadBook()
    loadSales()
  }, [id])

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />
  }

  const saleColumns = [
    {
      title: 'Client',
      key: 'client',
      render: (_: unknown, record: BookSaleRecord) => (
        <Link to="/clients/$clientId" params={{ clientId: record.client.id }}>
          {record.client.firstName} {record.client.lastName}
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
          { title: <Link to="/books">Books</Link> },
          { title: book?.title ?? '...' },
        ]}
      />

      <Card
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          marginBottom: 24,
        }}
      >
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%' }} size={16}>
            <div>
              <Typography.Text
                strong
                style={{ display: 'block', marginBottom: 6 }}
              >
                Titre
              </Typography.Text>
              <Input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                size="large"
              />
            </div>
            <div>
              <Typography.Text
                strong
                style={{ display: 'block', marginBottom: 6 }}
              >
                Année de publication
              </Typography.Text>
              <Input
                type="number"
                value={editYear || ''}
                onChange={e => setEditYear(Number(e.target.value))}
                size="large"
              />
            </div>
            <div>
              <Typography.Text
                strong
                style={{ display: 'block', marginBottom: 6 }}
              >
                Auteur
              </Typography.Text>
              <Select
                style={{ width: '100%' }}
                size="large"
                value={editAuthorId}
                onChange={(value: string) => setEditAuthorId(value)}
                options={authors.map(a => ({
                  value: a.id,
                  label: `${a.firstName} ${a.lastName}`,
                }))}
              />
            </div>
            <div>
              <Typography.Text
                strong
                style={{ display: 'block', marginBottom: 6 }}
              >
                Photo URL (facultatif)
              </Typography.Text>
              <Input
                value={editPhotoUrl}
                onChange={e => setEditPhotoUrl(e.target.value)}
                size="large"
                placeholder="https://exemple.com/cover.jpg"
              />
            </div>
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
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <Avatar
              shape="square"
              size={150}
              src={book?.photoUrl}
              icon={<BookOutlined />}
              style={{
                flexShrink: 0,
                borderRadius: 8,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backgroundColor: '#f5f5f5',
                color: '#4f46e5',
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Title level={2} style={{ margin: 0 }}>
                  {book?.title}
                </Title>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={startEdit}
                  shape="circle"
                />
              </div>
              <Tag
                icon={<CalendarOutlined />}
                color="default"
                style={{ borderRadius: 6, marginTop: 12, padding: '4px 8px' }}
              >
                Published in {book?.yearPublished}
              </Tag>

              <div style={{ marginTop: 24 }}>
                <Title level={4}>Auteur</Title>
                <p style={{ fontSize: 16 }}>
                  <Link
                    to="/authors/$authorId"
                    params={{ authorId: book?.author.id ?? '' }}
                  >
                    {book?.author.firstName} {book?.author.lastName}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Card
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Clients ayant acheté ce livre
          </Title>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => {
              loadClients()
              setIsModalOpen(true)
            }}
            style={{ borderRadius: 10 }}
          >
            Enregistrer un achat
          </Button>
        </div>
        <Table<BookSaleRecord>
          dataSource={sales}
          columns={saleColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title="Enregistrer un achat"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          setSelectedClientId(null)
          setSelectedDate(null)
        }}
        okText="Enregistrer"
        cancelText="Annuler"
        onOk={createSale}
        okButtonProps={{ disabled: !selectedClientId || !selectedDate }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 16,
          }}
        >
          <div>
            <Typography.Text
              strong
              style={{ display: 'block', marginBottom: 6 }}
            >
              Client
            </Typography.Text>
            <Select
              placeholder="Choisir un client"
              style={{ width: '100%' }}
              size="large"
              value={selectedClientId}
              onChange={(value: string) => setSelectedClientId(value)}
              options={clients.map(c => ({
                value: c.id,
                label: `${c.firstName} ${c.lastName}`,
              }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
          <div>
            <Typography.Text
              strong
              style={{ display: 'block', marginBottom: 6 }}
            >
              Date
            </Typography.Text>
            <DatePicker
              style={{ width: '100%' }}
              size="large"
              onChange={(_, dateString) =>
                setSelectedDate(dateString as string)
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
