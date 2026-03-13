import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Breadcrumb, Card, Skeleton, Table, Typography } from 'antd'
import axios from 'axios'

export const Route = createFileRoute('/sales')({
  component: SalesPage,
})

interface SaleRecord {
  id: string
  date: string
  clientId: string
  bookId: string
  client: {
    id: string
    firstName: string
    lastName: string
  }
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

function SalesPage() {
  const [sales, setSales] = useState<SaleRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get<SaleRecord[]>('http://localhost:3000/sales?all=true')
      .then(response => setSales(response.data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />

  const columns = [
    {
      title: 'Client',
      key: 'client',
      render: (_: unknown, record: SaleRecord) => (
        <Link to="/clients/$clientId" params={{ clientId: record.client.id }}>
          {record.client.firstName} {record.client.lastName}
        </Link>
      ),
    },
    {
      title: 'Livre',
      key: 'book',
      render: (_: unknown, record: SaleRecord) => (
        <Link to="/books/$bookId" params={{ bookId: record.book.id }}>
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
      <Breadcrumb style={{ marginBottom: 16 }} items={[{ title: 'Ventes' }]} />
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        Ventes
      </Typography.Title>
      <Card style={{ borderRadius: 12, border: '1px solid #e5e7eb' }}>
        <Table<SaleRecord>
          dataSource={sales}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}
