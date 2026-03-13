import { useEffect } from 'react'
import type { ReactElement } from 'react'
import { Breadcrumb, Typography } from 'antd'
import { useAuthorProvider } from '../providers/useAuthorProvider'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'

const { Title } = Typography

export function AuthorList(): ReactElement {
  const { authors, loadAuthors, createAuthor, deleteAuthor } =
    useAuthorProvider()

  useEffect(() => {
    loadAuthors()
  }, [])

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }} items={[{ title: 'Authors' }]} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Authors
        </Title>
        <CreateAuthorModal onCreate={createAuthor} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {authors.map(author => (
          <AuthorListItem
            key={author.id}
            author={author}
            onDelete={deleteAuthor}
          />
        ))}
      </div>
    </div>
  )
}
