import type { ReactElement } from 'react'
import { useState } from 'react'
import { Avatar, Button, Card, Modal, Tag, Tooltip } from 'antd'
import { DeleteOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import type { AuthorModel } from '../AuthorModel'

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
}

export function AuthorListItem({ author, onDelete }: AuthorListItemProps): ReactElement {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
          <Avatar
            size={48}
            src={author.photoUrl}
            icon={<UserOutlined />}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#4f46e5',
              flexShrink: 0,
            }}
          />
          <div>
            <Link
              to="/authors/$authorId"
              params={{ authorId: author.id }}
              style={{ fontSize: 16, fontWeight: 600 }}
            >
              {author.firstName} {author.lastName}
            </Link>
            <div style={{ marginTop: 6 }}>
              <Tag
                icon={<BookOutlined />}
                color="purple"
                style={{ borderRadius: 6, margin: 0 }}
              >
                {author.booksCount ?? 0} livre(s) écrit(s)
              </Tag>
            </div>
          </div>
        </div>

        <Tooltip title="Delete">
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
        title="Confirm deletion"
        open={isDeleteModalOpen}
        onOk={() => {
          onDelete(author.id)
          setIsDeleteModalOpen(false)
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete {author.firstName} {author.lastName}?
        </p>
      </Modal>
    </>
  )
}
