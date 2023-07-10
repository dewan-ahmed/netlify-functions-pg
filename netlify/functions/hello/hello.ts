import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { Client } from 'pg';

const handler: Handler = async (event, context) => {

const pg_username = process.env.PG_USERNAME;
const pg_password = process.env.PG_PASSWORD;
const pg_host = process.env.PG_HOST;
const pg_port = process.env.PG_PORT;
const pg_database = process.env.PG_DATABASE;

    try {
    // Set up the PostgreSQL connection
    const client = new Client({
      connectionString: 'postgres://${pg_username}:${pg_password}@${pg_host}:${pg_port}/${pg_database}',
    });

    await client.connect();

    // Execute a query to fetch the version number
    const result = await client.query('SELECT version()');
    const versionNumber = result.rows[0].version;

    // Close the PostgreSQL connection
    await client.end();

    // Return the version number as the response
    return {
      statusCode: 200,
      body: versionNumber,
    };
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

export { handler };
