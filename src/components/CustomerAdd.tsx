import { Button, Input, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { API_URL, ICustomer } from '../utils/api';
import CustomerForm from './CustomerForm';

interface IProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

const CustomerAdd: FC<IProps> = ({open, setOpen}) => {
  const [customer, setCustomer] = useState<Partial<ICustomer>>({});

  const handleSubmit = () => {
    fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => console.info(res))
      .catch(err => console.error(err));
  }

  return (
    <Modal 
      visible={open}
      title="Add a new customer"
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
    >
      <CustomerForm customer={customer} setCustomer={setCustomer} />
    </Modal>
  )
}

export default CustomerAdd;