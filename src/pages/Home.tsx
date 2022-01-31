import { Button, Space } from 'antd';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: FC<{}> = () => {
  const navigate = useNavigate();

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
    </div>
  )
}

export default Home;