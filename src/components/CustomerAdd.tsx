import { Alert } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { API_URL, ICustomer } from '../utils/api';
import { AlertData } from '../utils/forms';
import CustomerForm from './CustomerForm';

interface IProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  getCustomers: () => void,
}

const CustomerAdd: FC<IProps> = ({open, setOpen, getCustomers}) => {
  const [customer, setCustomer] = useState<Partial<ICustomer>>({});
  const [alert, setAlert] = useState<AlertData>();

  const handleSubmit = () => {
    fetch(`${API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
      .then(res => {
        console.info(res);
        setAlert({
          type: 'success',
          message: 'Successfully added customer'
        })

        setTimeout(() => {
          setOpen(false);
          getCustomers();
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        setAlert({
          type: 'error',
          message: 'Error adding customer'
        })
      });
  }

  return (
    <Modal 
      visible={open}
      title="Add a new customer"
      onCancel={() => setOpen(false)}
      onOk={handleSubmit}
    >
      { alert &&
        <Alert
          showIcon
          closable
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(undefined)}
        />
      }
      <CustomerForm customer={customer} setCustomer={setCustomer} />
    </Modal>
  )
}

export default CustomerAdd;