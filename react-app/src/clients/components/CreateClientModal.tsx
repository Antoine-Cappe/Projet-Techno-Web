import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Text } = Typography

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')

  const onClose = () => {
    setFirstName(''); setLastName(''); setEmail(''); setPhoto('');
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
        Ajouter un client
      </Button>
      <Modal
        title="Ajouter un nouveau client"
        open={isOpen}
        onCancel={onClose}
        okText="Créer"
        cancelText="Annuler"
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            email: email || undefined,
            photo: photo || undefined,
          })
          onClose()
        }}
        okButtonProps={{ disabled: !firstName.length || !lastName.length }}
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={16}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Prénom</Text>
            <Input placeholder="Entrer le prénom" value={firstName} onChange={e => setFirstName(e.target.value)} size="large" />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Nom</Text>
            <Input placeholder="Entrer le nom" value={lastName} onChange={e => setLastName(e.target.value)} size="large" />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Email (facultatif)</Text>
            <Input placeholder="exemple@email.com" value={email} onChange={e => setEmail(e.target.value)} size="large" />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Photo URL (facultatif)</Text>
            <Input placeholder="https://exemple.com/photo.jpg" value={photo} onChange={e => setPhoto(e.target.value)} size="large" />
          </div>
        </Space>
      </Modal>
    </>
  )
}