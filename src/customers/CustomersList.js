import React, { useState, useEffect } from 'react';
import axios from '../axios';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]); // State to store customers
  const [loading, setLoading] = useState(false);  // State to show loading
  const [error, setError] = useState('');         // State to handle errors

  // Fetch customers from the backend
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/customers');
      setCustomers(response.data); 
      console.log(response.data)// Set the customers in state
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  return (
   <>
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Customers</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && customers.length === 0 && <p>No customers found.</p>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{customer._id}</td>
              <td className="border p-2 text-center">{customer.restaurantName}</td>
              <td className="border p-2 text-center">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>

  );
};

export default CustomersList;
