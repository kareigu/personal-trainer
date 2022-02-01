import { FC, useEffect, useState } from 'react';
import { Button, Pagination, Popconfirm, Space, Table, TableColumnsType } from 'antd';
import { API_URL, ICustomer, ICustomers } from '../utils/api';
import { createFilter } from '../utils/table';
import './Customers.css';
import CustomerAdd from '../components/CustomerAdd';
import CustomerEdit from '../components/CustomerEdit';
import TrainingForm from '../components/TrainingForm';

const STREET_RGX = /^[0-9]+\s|\s[0-9]+$/g;


const Customers: FC<{}> = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTrainingModalOpen, setAddTrainingModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState<ICustomer>();

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    fetch(`${API_URL}/customers`)
      .then(res => res.json() as Promise<ICustomers>)
      .then(json => setCustomers(json.content))
      .catch(err => console.error(err));
  }


  const handleDelete = (c: ICustomer) => {
    const [self] = c.links.filter(e => e.rel === 'self');
    fetch(self.href, {
      method: 'DELETE'
    })
      .then(res => {
        console.info(res);
        getCustomers();
      })
      .catch(err => console.error(err));
  }

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
      sorter: (a, b) => a.streetaddress?.replace(STREET_RGX, '') > b.streetaddress?.replace(STREET_RGX, '') ? 1 : -1,
      filters: createFilter(customers.map(c => c.streetaddress?.replace(STREET_RGX, ''))),
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
    {
      title: 'Actions',
      render: (val, rec) => {

        return (
          <>
            <Space>
              <Button
                type="default"
                shape="round"
                onClick={() => {
                  setCurrentEdit(rec);
                  setAddTrainingModalOpen(true);
                }}
              >
                Add Training
              </Button>
              <Button
                type="primary"
                shape="round"
                onClick={() => {
                  setCurrentEdit(rec);
                  setEditModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure?"
                onConfirm={() => handleDelete(rec)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="dashed"
                  shape="round"
                  danger
                >
                  Remove
                </Button>
              </Popconfirm>
            </Space>
          </>
        )
      }
    },
  ]

  return (
    <div>
      <Space>
        <h1>Customers</h1>
        <div className="top-buttons">
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={() => setAddModalOpen(true)}
          >
            Add Customer
          </Button>
        </div>
      </Space>
      <Table 
        columns={columns} 
        dataSource={customers} 
        showSorterTooltip
        pagination={
          {
            showQuickJumper: true,
            showSizeChanger: true,
            defaultPageSize: 20,
          }
        }
      />

      <CustomerAdd open={addModalOpen} setOpen={setAddModalOpen} getCustomers={getCustomers} />

      { editModalOpen &&
        <CustomerEdit 
          open={editModalOpen} 
          setOpen={setEditModalOpen} 
          getCustomers={getCustomers} 
          baseCustomer={currentEdit} 
        />
      }

      { addTrainingModalOpen &&
        <TrainingForm 
          open={addTrainingModalOpen}
          setOpen={setAddTrainingModalOpen}
          customer={currentEdit}
        />
      }

    </div>
  )
}

export default Customers;