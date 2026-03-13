import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Skeleton,
  Space,
  Statistic,
  Table,
  Typography,
} from 'antd'
import {
  BookOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import axios from 'axios'
import type {
  AuthorDetailBook,
  AuthorDetailModel,
  UpdateAuthorModel,
} from '../AuthorModel'

interface AuthorDetailsProps {
  id: string
}

/* Colonnes du tableau de livres : titre cliquable, année de publication */
const bookColumns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title: string, record: AuthorDetailBook): ReactElement => (
      <Link
        to="/books/$bookId"
        params={{ bookId: record.id }}
        style={{ fontWeight: 500 }}
      >
        {title}
      </Link>
    ),
  },
  {
    title: 'Year',
    dataIndex: 'yearPublished',
    key: 'yearPublished',
  },
]

export function AuthorDetails({ id }: AuthorDetailsProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [author, setAuthor] = useState<AuthorDetailModel | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [photoUrl, setPhotoUrl] = useState<string>('')

  const loadAuthor = (): void => {
    setIsLoading(true)
    axios
      .get<AuthorDetailModel>(`http://localhost:3000/authors/${id}`)
      .then(response => {
        setAuthor(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setPhotoUrl(response.data.photoUrl ?? '')
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }

  const updateAuthor = (input: UpdateAuthorModel): void => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => loadAuthor())
      .catch(err => console.error(err))
  }

  const cancelEdit = (): void => {
    setFirstName(author?.firstName ?? '')
    setLastName(author?.lastName ?? '')
    setPhotoUrl(author?.photoUrl ?? '')
    setIsEditing(false)
  }

  const saveEdit = (): void => {
    updateAuthor({ firstName, lastName, photoUrl: photoUrl || undefined })
    setIsEditing(false)
  }

  useEffect(() => {
    loadAuthor()
  }, [id])

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link to="/authors">Authors</Link> },
          {
            title: author ? `${author.firstName} ${author.lastName}` : '...',
          },
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
            src={author?.photoUrl}
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
                placeholder="First Name"
                size="large"
              />
              <Input
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
                size="large"
              />
              {/* Champ photo : l'auteur peut stocker un lien vers une image */}
              <Input
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                placeholder="Photo URL (optional)"
                size="large"
              />
              <Space>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={saveEdit}
                >
                  Save
                </Button>
                <Button icon={<CloseOutlined />} onClick={cancelEdit}>
                  Cancel
                </Button>
              </Space>
            </Space>
          ) : (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {author?.firstName} {author?.lastName}
                </Typography.Title>
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => setIsEditing(true)}
                  shape="circle"
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              height: '100%',
            }}
          >
            {/* Nombre moyen de ventes des livres de cet auteur */}
            <Statistic
              title="Average sales per book"
              value={author?.averageSales ?? 0}
              prefix={<BookOutlined style={{ color: '#4f46e5' }} />}
              precision={1}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card
            style={{
              borderRadius: 12,
              border: '1px solid #e5e7eb',
              height: '100%',
            }}
          >
            <Statistic
              title="Books written"
              value={author?.books?.length ?? 0}
              prefix={<BookOutlined style={{ color: '#7c3aed' }} />}
            />
          </Card>
        </Col>
      </Row>

      {/* Liste des livres écrits par l'auteur */}
      <Card
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          marginTop: 24,
        }}
      >
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Books written
        </Typography.Title>
        <Table<AuthorDetailBook>
          dataSource={author?.books ?? []}
          columns={bookColumns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  )
}
