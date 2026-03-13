import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Table, Spin, Avatar, Typography, Button, Modal, Tooltip, Space } from 'antd'
import { UserOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { CreateClientModal } from '../../clients/components/CreateClientModal'
import type { ClientModel } from '../../clients/ClientModel'
import { Link } from '@tanstack/react-router';

const { Title } = Typography

// --- SOUS-COMPOSANT POUR L'ACTION DE SUPPRESSION ---
// C'est ici que l'on reproduit la logique qui marche chez les auteurs
function DeleteClientAction({ client, onDelete }: { client: ClientModel, onDelete: (id: string) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Tooltip title="Supprimer">
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => setIsModalOpen(true)} // Ouvre la modale
        />
      </Tooltip>

      <Modal
        title="Confirmer la suppression"
        open={isModalOpen}
        onOk={() => {
          onDelete(client.id)
          setIsModalOpen(false)
        }}
        onCancel={() => setIsModalOpen(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer <strong>{client.firstName} {client.lastName}</strong> ?</p>
      </Modal>
    </>
  )
}

// --- COMPOSANT PRINCIPAL ---
export const Route = createFileRoute('/clients/')({
  component: ClientsListPage,
})

function ClientsListPage() {
  const { clients, isLoading, createClient, deleteClient } = useClientProvider()

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string) => <Avatar src={photo} icon={<UserOutlined />} />,
    },
    { 
    title: 'Prénom', 
    dataIndex: 'firstName', 
    key: 'firstName',
    render: (text: string, record: any) => (
      <Link to="/clients/$clientId" params={{ clientId: record.id }}>
        {text}
      </Link>
    )
  },
    { title: 'Nom', dataIndex: 'lastName', key: 'lastName' },
    { 
      title: 'Livres achetés', 
      dataIndex: 'purchasedBooksCount', 
      key: 'purchasedBooksCount',
      render: (count: number) => <strong>{count}</strong> 
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ClientModel) => (
        <DeleteClientAction client={record} onDelete={deleteClient} />
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <TeamOutlined style={{ marginRight: 12 }} />
          Nos Clients
        </Title>
        <CreateClientModal onCreate={createClient} /> 
      </div>
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>
      ) : (
        <Table dataSource={clients} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} />
      )}
    </div>
  )
}