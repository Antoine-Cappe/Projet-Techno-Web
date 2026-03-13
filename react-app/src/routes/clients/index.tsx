import { createFileRoute } from '@tanstack/react-router'
import { ClientList } from '../../clients/components/ClientList'

export const Route = createFileRoute('/clients/')({
  component: ClientsListPage,
})

function ClientsListPage() {
  return <ClientList />
}
