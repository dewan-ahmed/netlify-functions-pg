import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { Client } from 'pg';

const handler: Handler = async (event, context) => {

const pg-username = process.env.PG-USERNAME;
const pg-password = process.env.PG-PASSWORD;
const pg-host = process.env.PG-HOST;
const pg-port = process.env.PG-PORT;
const pg-database = process.env.PG-DATABASE;

    try {
    // Set up the PostgreSQL connection
    const client = new Client({
      connectionString: 'postgres://${pg-username}:${pg-password}@${pg-host}:${pg-port}/${pg-database}',
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
