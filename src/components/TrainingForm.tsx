import { Button, DatePicker, Input, Modal, Space, Comment, List, Alert } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import { API_URL, ICustomer } from '../utils/api';
import { AlertData } from '../utils/forms';
import './Form.css'


interface IProps {
  customer: ICustomer | undefined,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

const TrainingForm: FC<IProps> = ({customer, open, setOpen}) => {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState(30);
  const [date, setDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertData>();

  if (!customer)
    setOpen(false);


  const handleSubmit = () => {
    setLoading(true);
    if (!customer) {
      setAlert({
        type: 'error',
        message: 'No customer data'
      })
      setLoading(false);
      return;
    }
      

    if (activity === '' || date === '') {
      setAlert({
        type: 'error',
        message: 'Input activity name and date'
      })
      setLoading(false);
      return;
    }
      

    const [c] = customer.links.filter(e => e.rel === 'self')

    fetch(`${API_URL}/trainings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date,
        activity,
        duration,
        customer: c.href
      })
    })
      .then(res => {
        console.info(res);
        setAlert({
          type: 'success',
          message: 'New training session added'
        });
        setLoading(false);
        setTimeout(() => {
          setOpen(false);
          setAlert(undefined);
        }, 2000);
      })
      .catch(err => {
        console.error(err);
        setAlert({
          type: 'error',
          message: 'Error adding training session'
        });
        setLoading(false);
      });
  }



  return (
    <Modal
      title="Adding a new training session"
      visible={open}
      confirmLoading={loading}
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

      { customer &&
        <Comment 
          author={`${customer.firstname} ${customer.lastname}`}
          content={
            <div>
              <p>{customer?.email}</p>
              <p>{customer?.phone}</p>
              <p>{`${customer?.streetaddress}, ${customer?.postcode} ${customer?.city}`}</p>
            </div>
          }
        />
      }

      <Space 
        direction="vertical"
        style={{width: '100%'}}
      >
        <Input 
          prefix="Activity:"
          value={activity}
          onChange={e => setActivity(e.currentTarget.value)}
        />
        <Input 
          prefix="Duration:"
          suffix="minutes"
          type="number"
          value={duration}
          onChange={e => setDuration(e.currentTarget.valueAsNumber)}
        />
        <DatePicker
          allowClear
          showTime
          onChange={(val, s) => setDate(val?.toISOString() || '')}
        />
      </Space>
    </Modal>
  )
}

export default TrainingForm;