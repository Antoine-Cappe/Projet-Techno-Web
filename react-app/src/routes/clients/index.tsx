import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Table, Spin, Avatar, Typography, Button, Modal, Tooltip } from 'antd'
import { UserOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { CreateClientModal } from '../../clients/components/CreateClientModal'

import type { ReactElement } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { ClientModel } from '../../clients/ClientModel'

const { Title } = Typography

interface DeleteClientActionProps {
  client: ClientModel;
  onDelete: (id: string) => void;
}

function DeleteClientAction({ client, onDelete }: DeleteClientActionProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <>
      <Tooltip title="Supprimer">
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={(): void => setIsModalOpen(true)} 
        />
      </Tooltip>

      <Modal
        title="Confirmer la suppression"
        open={isModalOpen}
        onOk={(): void => {
          onDelete(client.id)
          setIsModalOpen(false)
        }}
        onCancel={(): void => setIsModalOpen(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>Êtes-vous sûr de vouloir supprimer <strong>{client.firstName} {client.lastName}</strong> ?</p>
      </Modal>
    </>
  )
}

export const Route = createFileRoute('/clients/')({
  component: ClientsListPage,
})

function ClientsListPage(): ReactElement {
  const { clients, isLoading, createClient, deleteClient } = useClientProvider()

  const columns: ColumnsType<ClientModel> = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string | undefined): ReactElement => (
        <Avatar src={photo ?? undefined} icon={<UserOutlined />} />
      ),
    },
    { 
      title: 'Prénom', 
      dataIndex: 'firstName', 
      key: 'firstName',
      render: (text: string, record: ClientModel): ReactElement => (
        <Link to="/clients/$clientId" params={{ clientId: record.id }}>
          {text}
        </Link>
      )
    },
    { 
      title: 'Nom', 
      dataIndex: 'lastName', 
      key: 'lastName' 
    },
    { 
      title: 'Livres achetés', 
      dataIndex: 'purchasedBooksCount', 
      key: 'purchasedBooksCount',
      render: (count: number): ReactElement => <strong>{count}</strong> 
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: ClientModel): ReactElement => (
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
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table<ClientModel> 
          dataSource={clients} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 8 }} 
        />
      )}
    </div>
  )
}