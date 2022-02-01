import { Button, Space } from 'antd';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

const Calendar: FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Calendar</h1>
      <div>
        
      </div>
    </div>
  )
}

export default Calendar;