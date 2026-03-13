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
        Ajouter un auteur
      </Button>
      <Modal
        title="Ajouter un nouvel auteur"
        open={isOpen}
        onCancel={onClose}
        okText="Créer"
        onOk={() => {
          onCreate({ firstName, lastName, photoUrl: photo || undefined })
          onClose()
        }}
        okButtonProps={{ disabled: !firstName?.length || !lastName?.length }}
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={16}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Prénom</Text>
            <Input
              placeholder="Entrez le prénom"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Nom de famille</Text>
            <Input
              placeholder="Entrez le nom de famille"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Photo URL (optionnel)</Text>
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
