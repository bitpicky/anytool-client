import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getTable } from '../endpoints';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const AnyTable: React.FC<any> = ({ tableName }) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const content = await getTable(tableName);
      const columns = content.column_header.map((header: any) => ({
        title: header,
        dataIndex: header,
        key: header
      }));

      const source = content.table_content.map((item: any) => ({
        key: item.id,
        ...item
      }));

      setData({ columns, source });

    })();
  }, [tableName]);

  if (data) {
    return (
      <Table dataSource={data.source} columns={data.columns} />
    );
  }

  return null;
}

export default AnyTable
