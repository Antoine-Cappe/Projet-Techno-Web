import { Breadcrumb, Card, Skeleton, Tag, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { BookOutlined, CalendarOutlined } from '@ant-design/icons'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <BookOutlined style={{ fontSize: 26, color: '#fff' }} />
          </div>
          <div>
            <Title level={2} style={{ margin: 0 }}>
              {book?.title}
            </Title>
            <Tag
              icon={<CalendarOutlined />}
              color="default"
              style={{ borderRadius: 6, marginTop: 8 }}
            >
              Published in {book?.yearPublished}
            </Tag>
          </div>
        </div>
      </Card>
    </div>
  )
}
