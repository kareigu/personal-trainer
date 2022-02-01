import { useState, FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Layout, Typography, Button, Space, Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';


const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: FC<{}> = () => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch(e.currentTarget.innerText.toLowerCase()) {
      case 'customers': navigate("/customers"); break;
      case 'trainings': navigate("/trainings"); break;
      case 'calendar': navigate("/calendar"); break;
      default: navigate("/"); break;
    }
  }

  const Home = lazy(() => import('./pages/Home'));
  const Customers = lazy(() => import('./pages/Customers'));
  const Trainings = lazy(() => import('./pages/Trainings'));
  const Calendar = lazy(() => import('./pages/Calendar'));

  return (
    <Layout className="app">
      <Header className="navbar">
        <Space>
          <Link to="/">
            <Title className="nav-title">Personal Trainer</Title>
          </Link>
        
          <Button 
            className="navbutton" 
            type="link"
            onClick={handleNavigate}
          >
            Customers
          </Button>
          <Button 
            className="navbutton" 
            type="link"
            onClick={handleNavigate}
          >
            Trainings
          </Button>
          <Button 
            className="navbutton" 
            type="link"
            onClick={handleNavigate}
          >
            Calendar
          </Button>
        </Space>
      </Header>
      <Content className="content">
        <Suspense
          fallback={
            <div style={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginTop: '10rem',
              }}>
              <Spin />
            </div>
          }
        >
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/trainings" element={<Trainings />} />
              <Route path="/calendar" element={<Calendar />}/>
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  )
}

export default App
