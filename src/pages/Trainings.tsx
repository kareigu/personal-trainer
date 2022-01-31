import { Table, TableColumnsType } from 'antd';
import { FC, useEffect, useState } from 'react'
import { API_URL, ITraining, ITrainings } from '../utils/api';
import { createFilter } from '../utils/table';
import { DateTime } from 'luxon';


const Trainings: FC<{}> = () => {
  const [trainings, setTrainings] = useState<ITraining[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/trainings`)
      .then(res => res.json() as Promise<ITrainings>)
      .then(json => setTrainings(json.content))
      .catch(err => console.error(err));
  }, []);

  const columns: TableColumnsType<ITraining> = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      sorter: (a, b) => a.activity > b.activity ? 1 : -1,
      filters: createFilter(trainings.map(c => c.activity)),
      onFilter: (val, rec) => rec.activity === val,
      filterSearch: true,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration > b.duration ? 1 : -1,
      filters: createFilter(trainings.map(c => c.duration)),
      onFilter: (val, rec) => rec.duration === val,
      filterSearch: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date > b.date ? 1 : -1,
      filters: createFilter(trainings.map(c => DateTime.fromISO(c.date).toLocaleString())),
      onFilter: (val, rec) => {
        return DateTime.fromISO(rec.date).toLocaleString() === val;
      },
      filterSearch: true,
      render: (val, rec) => {

        return (
          <span>{DateTime.fromISO(rec.date).toLocaleString(DateTime.DATETIME_FULL)}</span>
        )
      }
    },
  ]


  return (
    <div>
      <h1>Trainings</h1>
      <Table columns={columns} dataSource={trainings} />
    </div>
  )
}

export default Trainings;