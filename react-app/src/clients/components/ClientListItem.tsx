import { useState } from 'react'
import { Avatar, Button, Card, Modal, Tag, Tooltip } from 'antd'
import { DeleteOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import type { ClientModel } from '../ClientModel'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
}

export function ClientListItem({ client, onDelete }: ClientListItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  return (
    <>
      <Card
        size="small"
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          transition: 'box-shadow 0.2s ease',
        }}
        styles={{
          body: {
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        }}
        hoverable
      >
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}
        >
          <Avatar
            size={48}
            src={client.photo}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#4f46e5',
              flexShrink: 0,
            }}
          />
          <div>
            <Link
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              style={{ fontSize: 16, fontWeight: 600 }}
            >
              {client.firstName} {client.lastName}
            </Link>
            <div style={{ marginTop: 6 }}>
              <Tag
                icon={<BookOutlined />}
                color="green"
                style={{ borderRadius: 6, margin: 0 }}
              >
                {client.purchasedBooksCount} livre(s) acheté(s)
              </Tag>
            </div>
          </div>
        </div>

        <Tooltip title="Supprimer">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => setIsDeleteModalOpen(true)}
            shape="circle"
          />
        </Tooltip>
      </Card>

      <Modal
        title="Confirmer la suppression"
        open={isDeleteModalOpen}
        onOk={() => {
          onDelete(client.id)
          setIsDeleteModalOpen(false)
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Supprimer"
        cancelText="Annuler"
        okButtonProps={{ danger: true }}
      >
        <p>
          Êtes-vous sûr de vouloir supprimer {client.firstName}{' '}
          {client.lastName} ?
        </p>
      </Modal>
    </>
  )
}
