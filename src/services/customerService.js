import axios from 'axios';

const API_URL = 'http://localhost:4000/wipApi';

const Customer = (incommingCustomer) => {
  const customer = {};
  if(!!incommingCustomer.id) customer.id = incommingCustomer.id;
  if(!!incommingCustomer.name) customer.name = incommingCustomer.name;
  if(!!incommingCustomer.phone) customer.phone = incommingCustomer.phone;
  if(!!incommingCustomer.address) customer.address = incommingCustomer.address;
  if(!!incommingCustomer.distance) customer.distance = incommingCustomer.distance;
  if(!!incommingCustomer.notes) customer.notes = incommingCustomer.notes;

  return customer;
}

export const customerService = {
  getAllCustomers: async () => {
    const response = await axios.get(`${API_URL}/customers`);
    const customers = response.data.map(Customer);
    return customers;
  },
  
  createCustomer: async (customer) => { // CREATE
    const response = await axios.post(`${API_URL}/customers`, customer);
    if (response.data.message === "created") return "succeeded";
    return "failed";
  },
  
  getCustomerById: async (customerId) => { // READ
    const response = await axios.get(`${API_URL}/customers/${customerId}`);
    const customer = Customer(response.data)
    return customer;
  },

  updateCustomer: async (customerId, updatedCustomer) => { // UPDATE
    const response = await axios.put(`${API_URL}/customers/${customerId}`, updatedCustomer);
    if (response.data.message === "updated") return "succeeded";
    return "failed";
  },
  
  deleteCustomer: async (customerId) => { // DELETE
    const response = await axios.delete(`${API_URL}/customers/${customerId}`);
    if (response.data.message === "deleted") return "succeeded";
    return "failed";
  },
};
