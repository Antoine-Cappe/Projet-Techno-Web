import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Card, Input, Space, Tag, Tooltip, Avatar, Modal } from 'antd' // Modal ajouté ici
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  UserOutlined,
  BookOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [isEditing, setIsEditing] = useState(false)
  // État pour gérer l'ouverture du modal de confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  return (
    <>
      <Card
        size="small"
        style={{
          borderRadius: 12,
          border: '1px solid #e5e7eb',
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
          <Avatar
            shape="square"
            size={64}
            src={book.photoUrl}
            icon={<BookOutlined />}
            style={{ flexShrink: 0, borderRadius: 8, backgroundColor: '#f5f5f5', color: '#4f46e5' }}
          />
          
          <div style={{ flex: 1, minWidth: 0 }}>
            {isEditing ? (
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ maxWidth: 300 }}
                onPressEnter={onValidateEdit}
                autoFocus
              />
            ) : (
              <div>
                <Link
                  to={`/books/$bookId`}
                  params={{ bookId: book.id }}
                  style={{ fontSize: 16, fontWeight: 600 }}
                >
                  {book.title}
                </Link>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <Tag
                    icon={<CalendarOutlined />}
                    color="default"
                    style={{ borderRadius: 6, margin: 0 }}
                  >
                    {book.yearPublished}
                  </Tag>
                  <Tag
                    icon={<UserOutlined />}
                    color="purple"
                    style={{ borderRadius: 6, margin: 0 }}
                  >
                    {book.author.firstName} {book.author.lastName}
                  </Tag>
                </div>
              </div>
            )}
          </div>
        </div>

        <Space size={8}>
          {isEditing ? (
            <>
              <Tooltip title="Save">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={onValidateEdit}
                  shape="circle"
                  size="small"
                />
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  icon={<CloseOutlined />}
                  onClick={onCancelEdit}
                  shape="circle"
                  size="small"
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Edit title">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
                shape="circle"
                size="small"
              />
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalOpen(true)} // Ouvre le modal
              shape="circle"
              size="small"
            />
          </Tooltip>
        </Space>
      </Card>

      {/* Modal de confirmation calqué sur AuthorListItem */}
      <Modal
        title="Confirm deletion"
        open={isDeleteModalOpen}
        onOk={() => {
          onDelete(book.id)
          setIsDeleteModalOpen(false)
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete {book.title}?
        </p>
      </Modal>
    </>
  )
}