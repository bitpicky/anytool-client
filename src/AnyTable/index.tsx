import { Button, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { getTable, updateTable } from '../endpoints';
import AnyInput from '../AnyInput';

const AnyTable: React.FC<any> = ({ tableName }) => {
  const [data, setData] = useState<any>(null);
  const [updates, setUpdates] = useState<any>({});
  const [savingUpdates, setSavingUpdates] = useState<any>(false);
  const [refresh, setRefresh] = useState(0);
  const onInputChange = (newState: any, shouldDelete = false) => {

    setUpdates((prevState: any) => {
      const updateState = {
        ...prevState,
        [newState.id]: {
          ...prevState[newState.id],
          [newState.header]: newState.value
        },
      }

      if (shouldDelete) {
        delete updateState?.[newState.id]?.[newState.header]

        if (!Object.keys(updateState?.[newState.id] ?? {}).length) {
          delete updateState?.[newState.id];
        }
      }

      return updateState;
    }
    );
  }

  const onUpdate = async () => {
    const ids = Object.keys(updates);
    const payload: any = [];
    ids.forEach(id => {
      payload.push({
        filter: {
          id: parseInt(id)
        },
        content: updates[id]
      })
    });

    setSavingUpdates(true);

    await updateTable({
      target_schema: "public",
      target_table: tableName,
      payload
    })

    setSavingUpdates(false);
    setUpdates({});
    setRefresh(refresh + 1);
  }

  useEffect(() => {
    (async () => {
      const content = await getTable(tableName);
      const columns = content.column_header.map((header: any) => ({
        title: header,
        dataIndex: header,
        render: (text: any, record: any) => {
          if (header === 'id') {
            return text;
          }

          return <AnyInput record={record} text={text} header={header} onInputChange={onInputChange} />;
        },
        key: header
      }));

      const source = content.table_content.map((item: any) => ({
        key: item.id,
        ...item
      }));

      setData({ columns, source });

    })();
  }, [tableName, refresh]);

  if (data) {
    return (
      <>
        <Table
          dataSource={data.source}
          columns={data.columns}
          footer={() => <>
            <Space style={{justifyContent: 'flex-end', width: '100%'}}>
              {!!Object.keys(updates).length && <Button type='primary' loading={savingUpdates} onClick={onUpdate}>Save changes</Button>}
            </Space>
          </>}
        />

      </>
    );
  }

  return null;
}

export default AnyTable
