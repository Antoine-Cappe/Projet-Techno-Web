import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

const { Text } = Typography

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState(0)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(0)
    setAuthorId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => setIsOpen(true)}
        style={{ borderRadius: 10 }}
      >
        Add Book
      </Button>
      <Modal
        title="Add a new book"
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (authorId) {
            onCreate({ title, yearPublished, authorId })
            onClose()
          }
        }}
        okText="Create"
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={16}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Title</Text>
            <Input
              placeholder="Enter book title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Author</Text>
            <Select
              placeholder="Select an author"
              style={{ width: '100%' }}
              size="large"
              options={authors.map(author => ({
                label: `${author.firstName} ${author.lastName}`,
                value: author.id,
              }))}
              onChange={value => setAuthorId(value)}
              value={authorId}
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Year Published</Text>
            <Input
              type="number"
              placeholder="e.g. 2024"
              value={yearPublished || ''}
              onChange={e => setYearPublished(Number(e.target.value))}
              size="large"
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
