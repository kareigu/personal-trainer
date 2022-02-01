import Modal from 'antd/lib/modal/Modal';
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { ICustomer } from '../utils/api';
import CustomerForm from './CustomerForm';

interface IProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  baseCustomer?: ICustomer
  getCustomers: () => void,
}

const CustomerEdit: FC<IProps> = ({open, setOpen, getCustomers, baseCustomer}) => {
  const [customer, setCustomer] = useState<Partial<ICustomer>>(baseCustomer || {});

  const handleSubmit = () => {
    const [self] = baseCustomer ? baseCustomer.links.filter(e => e.rel === 'self') : [{ rel: 'self', href: ''}];

    fetch(self.href, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => {
        console.info(res);
        setOpen(false);
        getCustomers();
      })
      .catch(err => console.error(err));
  }

  return (
    <Modal 
      visible={open}
      title={`Editing details of ${customer.firstname} ${customer.lastname}`}
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
    >
      <CustomerForm customer={customer} setCustomer={setCustomer} />
    </Modal>
  )
}

export default CustomerEdit;