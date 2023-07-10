import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { Client } from 'pg';

const handler: Handler = async (event, context) => {

    const pgUsername = process.env.pg_username;
    const pgPassword = process.env.pg_password;
    const pgHost = process.env.pg_host;
    const pgPort = process.env.pg_port;
    const pgDatabase = process.env.pg_database;

    try {
    // Set up the PostgreSQL connection
    const client = new Client({
        connectionString: `postgres://${pgUsername}:${pgPassword}@${pgHost}:${pgPort}/${pgDatabase}`,
    });

    await client.connect();

    // Execute a query to fetch the version number
    const result = await client.query('SELECT version()');
    const versionNumber = result.rows[0].version;

    // Create an HTML response
    const htmlResponse = `
      <html>
        <head>
          <title>PostgreSQL Version</title>
        </head>
        <body>
          <h1>PostgreSQL Version</h1>
          <p>Version number: ${versionNumber}</p>
        </body>
      </html>
    `;

    // Return the HTML response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: htmlResponse,
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
