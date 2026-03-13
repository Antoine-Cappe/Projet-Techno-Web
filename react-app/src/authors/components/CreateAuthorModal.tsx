import { useState } from 'react'
import type { CreateAuthorModel } from '../AuthorModel'
import { Button, Input, Modal, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Text } = Typography

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [photo, setPhoto] = useState<string>('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setPhoto('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => setIsOpen(true)}
        style={{ borderRadius: 10 }}
      >
        Add Author
      </Button>
      <Modal
        title="Add a new author"
        open={isOpen}
        onCancel={onClose}
        okText="Create"
        onOk={() => {
          onCreate({ firstName, lastName, photoUrl: photo || undefined })
          onClose()
        }}
        okButtonProps={{ disabled: !firstName?.length || !lastName?.length }}
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={16}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>First Name</Text>
            <Input
              placeholder="Enter first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Last Name</Text>
            <Input
              placeholder="Enter last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Photo URL (optional)</Text>
            <Input
              placeholder="https://example.com/photo.jpg"
              value={photo}
              onChange={e => setPhoto(e.target.value)}
              size="large"
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}
