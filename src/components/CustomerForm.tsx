import { Button, Input, Space } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ICustomer } from '../utils/api';
import './CustomerForm.css'

type Customer = ICustomer | Partial<ICustomer>

interface IProps {
  customer: Customer,
  setCustomer: Dispatch<SetStateAction<Customer>>,
}

const CustomerForm: FC<IProps> = ({customer, setCustomer}) => {
  const [name, setName] = useState(customer.firstname || '');
  const [surname, setSurname] = useState(customer.lastname || '');
  const [email, setEmail] = useState(customer.email || '');
  const [phone, setPhone] = useState(customer.phone || '');
  const [address, setAddress] = useState(customer.streetaddress || '');
  const [city, setCity] = useState(customer.city || '');
  const [postcode, setPostcode] = useState(customer.postcode || '');

  useEffect(() => {
    setCustomer({
      firstname: name,
      lastname: surname,
      email,
      phone,
      streetaddress: address,
      city,
      postcode,
      content: [],
      links: []
    })
  }, [name, surname, email, phone, address, city, postcode]);


  return (
    <div>
      <Space 
        direction="vertical"
        style={{width: '100%'}}
      >
        <Input 
          prefix="Name:"
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <Input 
          prefix="Surname:"
          value={surname}
          onChange={e => setSurname(e.currentTarget.value)}
        />
        <Input 
          prefix="Email:"
          type="email"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <Input 
          prefix="Phone:"
          value={phone}
          onChange={e => setPhone(e.currentTarget.value)}
        />
        <Input 
          prefix="Address:"
          value={address}
          onChange={e => setAddress(e.currentTarget.value)}
        />
        <Input 
          prefix="City:"
          value={city}
          onChange={e => setCity(e.currentTarget.value)}
        />
        <Input 
          prefix="Postcode:"
          value={postcode}
          onChange={e => setPostcode(e.currentTarget.value)}
        />
      </Space>
    </div>
  )
}

export default CustomerForm;