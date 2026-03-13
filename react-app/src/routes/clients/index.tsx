// react-app/src/routes/clients/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Table, Spin, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useClientProvider } from '../../clients/providers/useClientProvider';

export const Route = createFileRoute('/clients/')({
  component: ClientsListPage,
});

function ClientsListPage() {
  const { clients, isLoading } = useClientProvider();

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo: string) => (
        <Avatar src={photo} icon={<UserOutlined />} />
      ),
    },
    {
      title: 'Prénom',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Nom',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Livres achetés',
      dataIndex: 'purchasedBooksCount',
      key: 'purchasedBooksCount',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des Clients</h1>
      {isLoading ? <Spin size="large" /> : (
        <Table dataSource={clients} columns={columns} rowKey="id" />
      )}
    </div>
  );
}