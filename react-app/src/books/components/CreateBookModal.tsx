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
  const [yearPublished, setYearPublished] = useState(2026) // Changement par défaut à 2026
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const [photoUrl, setPhotoUrl] = useState('') // Ajout de l'état pour la photo
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(2026)
    setAuthorId(undefined)
    setPhotoUrl('') // Réinitialisation de la photo
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
        Ajouter un livre
      </Button>
      <Modal
        title="Ajouter un nouveau livre"
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (authorId) {
            // Inclusion de photoUrl dans l'objet envoyé
            onCreate({ title, yearPublished, authorId, photoUrl }) 
            onClose()
          }
        }}
        okText="Créer"
        okButtonProps={{
          // Le bouton est activé si on a un auteur, un titre et une année
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%', marginTop: 16 }} size={16}>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Titre</Text>
            <Input
              placeholder="Entrez le titre du livre"
              value={title}
              onChange={e => setTitle(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Auteur</Text>
            <Select
              placeholder="Sélectionnez un auteur"
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
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Année de publication</Text>
            <Input
              type="number"
              placeholder="e.g. 2026"
              value={yearPublished || ''}
              onChange={e => setYearPublished(Number(e.target.value))}
              size="large"
            />
          </div>
          {/* Nouveau champ pour la Photo URL */}
          <div>
            <Text strong style={{ display: 'block', marginBottom: 6 }}>Photo URL (Optionnel)</Text>
            <Input
              placeholder="Collez l'URL de la photo du livre"
              value={photoUrl}
              onChange={e => setPhotoUrl(e.target.value)}
              size="large"
            />
          </div>
        </Space>
      </Modal>
    </>
  )
}