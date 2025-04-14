import { env } from "$env/dynamic/private";
import mysql, { type RowDataPacket, type ResultSetHeader, } from 'mysql2/promise';

// Define TypeScript types
type QueryResult = RowDataPacket[] | ResultSetHeader | ResultSetHeader[];

interface BulkUpdateRow {
  [key: string]: any;
}
const config = {
  host: env.DB_SERVER,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME
}

// MySQL Query Execution with Dynamic Connection
export async function query(sqlQuery: string): Promise<RowDataPacket[]> {
  const connection = await mysql.createConnection(config);
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(sqlQuery);
    
    return rows;
  } finally {
    await connection.end();
  }
}

export async function bulkQuery(sqlQuery: string, values: any[]): Promise<QueryResult> {
  const connection = await mysql.createConnection(config);
  try {
    const [result] = await connection.query<QueryResult>(sqlQuery, values);
    return result;
  } finally {
    await connection.end();
  }
}

export async function bulkUpdate(table: string, updates: BulkUpdateRow[], keyColumn: string): Promise<ResultSetHeader> {
  if (!updates.length) throw new Error("Updates array cannot be empty");

  const columns = Object.keys(updates[0]).filter(col => col !== keyColumn);
  if (!columns.length) throw new Error("No valid columns to update");

  const cases = columns.map(col => {
    const caseStatements = updates.map(row => `${row[keyColumn]} THEN ?`).join(' ');
    return `${col} = CASE ${keyColumn} ${caseStatements} END`;
  }).join(', ');

  const sqlQuery = `UPDATE ${table} SET ${cases} WHERE ${keyColumn} IN (${updates.map(row => '?').join(', ')})`;
  const values = updates.flatMap(row => columns.map(col => row[col])).concat(updates.map(row => row[keyColumn]));

  const connection = await mysql.createConnection(config);
  try {
    const [result] = await connection.query<ResultSetHeader>(sqlQuery, values);
    return result;
  } finally {
    await connection.end();
  }
}

// MySQL Execute Query with Parameters
export const executeQuery = async (query: string, params: any[] = []): Promise<RowDataPacket[]> => {
  const connection = await mysql.createConnection(config);
  try {
    const [result] = await connection.execute<RowDataPacket[]>(query, params);
    return result;
  } finally {
    await connection.end();
  }
};
