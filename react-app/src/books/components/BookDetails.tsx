import { Breadcrumb, Card, Skeleton, Tag, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { CalendarOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

const { Title } = Typography

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)

  useEffect(() => {
    loadBook()
  }, [id])

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 4 }} />
  }

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
        }}
      >
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Affichage de la couverture du livre */}
          <img
            src={book?.photoUrl || 'https://via.placeholder.com/150x225?text=No+Cover'}
            alt={book?.title}
            style={{
              width: 150,
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              objectFit: 'cover',
              flexShrink: 0
            }}
          />

          <div style={{ flex: 1 }}>
            <Title level={2} style={{ margin: 0 }}>
              {book?.title}
            </Title>
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
                {book?.author.firstName} {book?.author.lastName}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}