import React, {useState, useEffect} from 'react';
import axios from 'axios';


const momoTokenUrl = 'http://localhost:3001/get-momo-token';
const momoRequestToPayUrl = 'http://localhost:3001/request-to-pay';

const Cart = ({ cartItems, removeFromCart }) => {
  const [total, setTotal] = useState(0);
  const [phone, setPhone] = useState('');
		const [momoResponse, setMomoResponse] = useState(null);
		const [momoToken, setMomoToken] = useState(null);

		const getMomoToken = async () => {
			const token = await axios({
				method: 'post',
				url: momoTokenUrl,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				data: {
					apiKey: 'Nzg1NTgxY2UtYWUxOC00YWRhLTk1MjgtNmRjYjZlMjc4OWU3OjY0MDdiZjU3MjNiMjQwM2U5MzVlNmRiNzhlNjQ4N2Q1',
					subscriptionKey: '5b158c87ce9b495fb64dcac1852d745b',
				},
			});
			console.log(token.data.momoToken)
			setMomoToken(token.data.momoToken);
		}

		useEffect(() => {
			getMomoToken();
		}, [])

		const requestToPay = async () => {
			if (!momoToken) {
				alert('Please wait for momo token');
				return;
			}

			if (!phone) {
				alert('Please enter a phone number');
				return;
			}
			// const { total, phone } = req.body;
			const data = {
				total,
				phone,
			}
			const momoResponse = await axios({
				method: 'post',
				url: momoRequestToPayUrl,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				data,
			});
			console.log(momoResponse)
			setMomoResponse(momoResponse.data);
		}
  
useEffect(() => {
  let total = 0;
  cartItems.map(item => {
    total = total + item.price;
  })
  total = total + (total * 0.1);

  setTotal(total);
}
, [cartItems])


  return (
    <div className="shadow-md p-4 rounded-md max-w-md mx-auto bg-bgcolor mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg font-bold text-center mb-4">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="
            flex flex-row items-center  justify-between px-8">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-lg font-bold">${item.price}</p>
              <button onClick={() => removeFromCart(item)} className="font-bold px-4 py-2 rounded-md bg-danger shadow-md hover:bg-accent-dark hover:text-accent transition duration-200 mb-2">Remove</button>
            </div>
          ))}
          <p className="text-lg font-bold text-right pr-8">Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
        </div>
      )}
    {cartItems.length > 0 && (
      <>
      <h2 className="text-xl font-bold text-center my-4">Purchase</h2>
      <div className="tax flex flex-row items-center justify-between pr-8 mb-4">
        <p className="text-lg font-bold">Tax</p>
        <p className="text-lg font-bold">10%</p>
      </div>
      <div className="amount flex flex-row items-center justify-between pr-8 mb-4">
        <p className="text-lg font-bold">Total Amount to pay</p>
        <p className="text-lg font-bold">${total}</p>
      </div>
      <div className="amount flex flex-row items-center justify-between pr-8 mb-4">
      <p className="text-lg font-bold pr-4">Phone Number</p>
      <input className="text-lg font-bold border border-gray-400 rounded-md px-2
      " type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="btn-container flex flex-row justify-end text-center pr-8">
      <button className="font-bold px-4  py-2 rounded-md shadow-md hover:bg-accent-dark hover:text-accent transition duration-200 mb-10 bg-success
      "
      onClick={() => requestToPay()}
      >Pay</button>
      </div>
      </>
    )}
    </div>
  );
};

export default Cart;
