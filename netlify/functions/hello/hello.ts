import { Handler } from '@netlify/functions';
import axios from 'axios';

const handler: Handler = async (event) => {
  try {
    // Make a request to the OpenWeatherMap API
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = 'London'; // Replace with your desired city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await axios.get(url);

    // Print the response data
    console.log(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
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
