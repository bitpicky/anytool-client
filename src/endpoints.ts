import axios from "axios";

export const getTables = async () => {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:8000/tables',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {schema_name: "public"}
  });

  return response.data?.tables ?? [];
}

export const getTable = async (tableName: string) => {
  const response = await axios({
    method: 'POST',
    url: 'http://localhost:8000/table_content',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target_schema: "public",
      target_table: tableName
    }
  });

  return response.data;
}