import type { ReactElement } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetails } from '../authors/components/AuthorDetails'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
})

function AuthorDetailsPage(): ReactElement {
  const { authorId } = Route.useParams()
  return <AuthorDetails id={authorId} />
}
