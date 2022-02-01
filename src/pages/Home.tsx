import { Button, Space, Typography } from 'antd';
import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Chart, AxisOptions } from 'react-charts';
import { API_URL, ITraining, ITrainings } from '../utils/api';
import './Home.css';

type TrainingCount = {
  type: string,
  count: number,
}

type Series = {
  label: string,
  data: TrainingCount[],
}

const { Title } = Typography;

const Home: FC<{}> = () => {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState<Series[]>([{
    label: 'Number of minutes',
    data: [{type: 'null', count: 0}]
  }]);

  useEffect(() => {
    fetch(`${API_URL}/trainings`)
      .then(res => res.json() as Promise<ITrainings>)
      .then(json => {
        console.log(json.content);
        const data: Series[] = [
          {
            label: 'Number of minutes',
            data: [
              ...new Set(
                json
                  .content
                  .map(e => e.activity))]
                  .map(t => {
                return {
                  type: t,
                  count: json
                    .content
                    .filter(e => e.activity === t)
                    .reduce((p, c) => p += c.duration, 0)
                }
            })
          }
        ]
        setTrainings(data);
      })
      .catch(err => console.error(err));
  }, []);
  

  

  const primaryAxis = useMemo((): AxisOptions<TrainingCount> => ({
    getValue: datum => datum.type,
  }), []);

  const secondaryAxes = useMemo((): AxisOptions<TrainingCount>[] => [{
      getValue: datum => datum.count,
      elementType: 'bar',
      hardMin: 0,
      max: 10,
    },
  ], []);

  return (
    <div className="home">
      <h1>Home</h1>
      <div>
        <Space>
          <Button
            type="primary"
            onClick={() => navigate('/customers')}
          >
            Customers
          </Button>
          <Button
            type="dashed"
            onClick={() => navigate("trainings")}
          >
            Trainings
          </Button>
        </Space>
      </div>
      <Title className="chart-title">Minutes per training activity</Title>
      <div className="stats-chart">
        <Chart 
          options={{
            data: trainings,
            primaryAxis,
            secondaryAxes,
            dark: false,
            initialWidth: 800,
            initialHeight: 400,
          }}
        />
      </div>
    </div>
  )
}

export default Home;