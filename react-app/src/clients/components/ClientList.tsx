import { Breadcrumb, Skeleton, Typography } from 'antd'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

const { Title } = Typography

export function ClientList() {
  const { clients, isLoading, createClient, deleteClient } = useClientProvider()

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }} items={[{ title: 'Clients' }]} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Clients
        </Title>
        <CreateClientModal onCreate={createClient} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {clients.map(client => (
          <ClientListItem
            key={client.id}
            client={client}
            onDelete={deleteClient}
          />
        ))}
      </div>
    </div>
  )
}
