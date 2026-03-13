import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, message, Space, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getSales,
  createSale,
  deleteSale,
  getClients,
  getBooks,
} from './salesService';
import type { Sale, Client, Book } from './salesService';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Charger les données au démarrage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [salesData, clientsData, booksData] = await Promise.all([
        getSales(),
        getClients(),
        getBooks(),
      ]);
      setSales(salesData);
      setClients(clientsData);
      setBooks(booksData);
    } catch (error) {
      message.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (values: any) => {
    try {
      const newSale = await createSale({
        clientId: values.clientId,
        bookId: values.bookId,
        date: values.date.format('YYYY-MM-DD'),
      });
      setSales([...sales, newSale]);
      message.success('Vente ajoutée avec succès !');
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      message.error('Erreur lors de l\'ajout de la vente');
      console.error(error);
    }
  };

  // Supprimer une vente
  const handleDelete = async (id: string) => {
    try {
      await deleteSale(id);
      setSales(sales.filter((sale) => sale.id !== id));
      message.success('Vente supprimée avec succès !');
    } catch (error) {
      message.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  // Colonnes du tableau
  const columns = [
    {
      title: 'Client',
      dataIndex: ['client', 'name'],
      key: 'client',
    },
    {
      title: 'Livre',
      dataIndex: ['book', 'title'],
      key: 'book',
    },
    {
      title: 'Date d\'achat',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Sale) => (
        <Space>
          <Popconfirm
            title="Confirmer la suppression"
            description="Êtes-vous sûr de vouloir supprimer cette vente ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Oui"
            cancelText="Non"
          >
            <Button danger icon={<DeleteOutlined />}>
              Supprimer
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestion des Ventes</h1>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: '20px' }}
      >
        Ajouter une vente
      </Button>

      <Table
        columns={columns}
        dataSource={sales}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Ajouter une nouvelle vente"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => setIsModalOpen(false)}
        okText="Ajouter"
        cancelText="Annuler"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Client"
            name="clientId"
            rules={[{ required: true, message: 'Veuillez sélectionner un client' }]}
          >
            <Select placeholder="Choisir un client">
              {clients.map((client) => (
                <Select.Option key={client.id} value={client.id}>
                  {client.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Livre"
            name="bookId"
            rules={[{ required: true, message: 'Veuillez sélectionner un livre' }]}
          >
            <Select placeholder="Choisir un livre">
              {books.map((book) => (
                <Select.Option key={book.id} value={book.id}>
                  {book.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date d'achat"
            name="date"
            rules={[{ required: true, message: 'Veuillez sélectionner une date' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Sales;