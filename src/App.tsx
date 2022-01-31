import { useState, FC } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Layout, Typography, Button, Space } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: FC<{}> = () => {
  const navigate = useNavigate();

  const handleNavigate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch(e.currentTarget.innerText.toLowerCase()) {
      case 'customers': navigate("/customers"); break;
      case 'trainings': navigate("/trainings"); break;
      default: navigate("/"); break;
    }
  }

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
        </Space>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App
