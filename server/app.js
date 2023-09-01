const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Choose any port you prefer

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const momoHost = 'sandbox.momodeveloper.mtn.com';
const momoTokenUrl = `https://${momoHost}/collection/token/`;
const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`;

let momoToken = null;

// Endpoint to fetch MoMo token
app.get('/', (req, res) => {
		res.send('Hello World!');
});
app.post('/get-momo-token', async (req, res) => {
		try {
				const { apiKey, subscriptionKey } = req.body;
				console.log(apiKey, subscriptionKey);

				const momoTokenResponse = await axios.post(
						momoTokenUrl,
						{},
						{
								headers: {
										'Content-Type': 'application/json',
										'Ocp-Apim-Subscription-Key': subscriptionKey,
										Authorization: `Basic ${apiKey}`,
								},
						}
				);
						console.log(momoTokenResponse.data);
				momoToken = momoTokenResponse.data.access_token;

				res.json({ momoToken });
		} catch (error) {
				console.error(error);
				res.status(500).json({ error: 'An error occurred' });
		}
});

// Endpoint to make a request to pay
app.post('/request-to-pay', async (req, res) => {
  try {
    if (!momoToken) {
      return res.status(400).json({ error: 'MoMo token not available' });
    }

    const { total, phone } = req.body;

    const body = {
      amount: total,
      currency: 'EUR',
      externalId: 'c8f060db-5126-47a7-a67b-2fee08c0f30d',
      payer: {
        partyIdType: 'MSISDN',
        partyId: 46733123454,
      },
      payerMessage: 'Payment for order',
      payeeNote: 'Payment for order',
    };

    const momoResponse = await axios.post(
      momoRequestToPayUrl,
      body,
      {
        headers: {
										'X-Reference-Id': 'c8f060db-5126-47a7-a67b-2fee08c0f30c',
										'X-Target-Environment': 'sandbox',
										'Ocp-Apim-Subscription-Key':'5b158c87ce9b495fb64dcac1852d745b',
										Authorization: `Bearer ${momoToken}`,
										'Content-Type': 'application/json',
        },
      }
    );

    res.json({ momoResponse: momoResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
