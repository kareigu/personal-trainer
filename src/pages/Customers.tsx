import { FC, useEffect, useState } from 'react';
import { Table, TableColumnsType } from 'antd';
import { API_URL, ICustomer, ICustomers } from '../utils/api';
import { createFilter } from '../utils/table';


const Customers: FC<{}> = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/customers`)
      .then(res => res.json() as Promise<ICustomers>)
      .then(json => setCustomers(json.content))
      .catch(err => console.error(err));
  }, []);

  const columns: TableColumnsType<ICustomer> = [
    {
      title: 'Name',
      dataIndex: 'firstname',
      key: 'firstname',
      sorter: (a, b) => a.firstname > b.firstname ? 1 : -1,
      filters: createFilter(customers.map(c => c.firstname)),
      onFilter: (val, rec) => rec.firstname === val,
      filterSearch: true,
    },
    {
      title: 'Surname',
      dataIndex: 'lastname',
      key: 'lastname',
      sorter: (a, b) => a.lastname > b.lastname ? 1 : -1,
      filters: createFilter(customers.map(c => c.lastname)),
      onFilter: (val, rec) => rec.lastname === val,
      filterSearch: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email > b.email ? 1 : -1,
      filters: createFilter(customers.map(c => c.email)),
      onFilter: (val, rec) => rec.email === val,
      filterSearch: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone > b.phone ? 1 : -1,
      filters: createFilter(customers.map(c => c.phone)),
      onFilter: (val, rec) => rec.phone === val,
      filterSearch: true,
    },
    {
      title: 'Address',
      dataIndex: 'streetaddress',
      key: 'streetaddress',
      sorter: (a, b) => a.streetaddress > b.streetaddress ? 1 : -1,
      filters: createFilter(customers.map(c => c.streetaddress.replace(/^[0-9]+\s|\s[0-9]+$/g, ''))),
      onFilter: (val, rec) => rec.streetaddress.includes(val as string),
      filterSearch: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.city > b.city ? 1 : -1,
      filters: createFilter(customers.map(c => c.city)),
      onFilter: (val, rec) => rec.city === val,
      filterSearch: true,
    },
    {
      title: 'Postcode',
      dataIndex: 'postcode',
      key: 'postcode',
      sorter: (a, b) => a.postcode > b.postcode ? 1 : -1,
      filters: createFilter(customers.map(c => c.postcode)),
      onFilter: (val, rec) => rec.postcode === val,
      filterSearch: true,
    },
  ]

  return (
    <div>
      <h1>Customers</h1>
      <Table columns={columns} dataSource={customers} />
    </div>
  )
}

export default Customers;