// netlify/functions/response.js
exports.handler = async (event, context) => {
    // Check if it's a POST request
    if (event.httpMethod === 'POST') {
        try {
            // Parse the body of the request (which should contain the response from the user)
            const { response } = JSON.parse(event.body);

            // You can log the response to the console (visible in the Netlify function logs)
            console.log('User response:', response);

            // Respond with a success message
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Response received', response: response }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error parsing request', error: error.message }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }
};
