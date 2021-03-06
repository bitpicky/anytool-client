import { Row, Col, Select, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getTables } from './endpoints';
import AnyTable from './AnyTable';
import 'antd/dist/antd.css';

const App = () => {
  const [tablesLoading, setTablesLoading] = useState(false)
  const [tables, setTables] = useState([])
  const [selected, setSelected] = useState(null)
  const onTableChange = (ev: any) => {
    setSelected(ev.value);
  }
  useEffect(() => {
    (async () => {
      setTablesLoading(true);
      const tables = await getTables();
      setTablesLoading(false);

      setTables(tables);
    })();
  }, []);

  return (
    <Row>
      <Col span={16} offset={4}>
        <h1 style={{ margin: '48px 0 24px' }}>AnyTool</h1>
      </Col>
      <Col span={16} offset={4}>
        <Space size={16} direction="vertical" style={{ width: '100%' }}>
          <Select
            labelInValue
            filterOption={false}
            style={{ width: 230 }}
            loading={tablesLoading}
            placeholder="Select a table"
            onChange={onTableChange}
          >
            {tables.map(table => <Select.Option key={table} value={table}>{table}</Select.Option>)}
          </Select>
          {selected && <AnyTable tableName={selected} />}
        </Space>
      </Col>
    </Row>
  );
}

export default App;
