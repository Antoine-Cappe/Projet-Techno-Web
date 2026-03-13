import React from 'react';
import { PageHeader, Table, Tag } from 'antd';

const Sales = () => {
  const data = [
    { key: '1', product: 'Product A', amount: 100, status: 'Completed' },
    { key: '2', product: 'Product B', amount: 200, status: 'Pending' },
    { key: '3', product: 'Product C', amount: 300, status: 'Cancelled' },
  ];

  const columns = [
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = 'geekblue';
        if (status === 'Completed') {
          color = 'green';
        } else if (status === 'Pending') {
          color = 'volcano';
        } else if (status === 'Cancelled') {
          color = 'red';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div>
      <PageHeader title="Sales" />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Sales;
