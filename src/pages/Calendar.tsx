import '@fullcalendar/react/dist/vdom'
import { Button, Space } from 'antd';
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import FullCalendar, { EventInput, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DateTime } from 'luxon';
import { API_URL, ITrainingCalendar } from '../utils/api';
import './Calendar.css';

const Calendar: FC<{}> = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    fetch(`${API_URL.split('/api')[0]}/gettrainings`)
      .then(res => res.json() as Promise<ITrainingCalendar[]>)
      .then(json => {
        console.log(json);
        const ev: EventInput[] = json.map(e => {
          const end = DateTime.fromISO(e.date).plus({minutes: e.duration}).toISO()

          return {
            id: `${e.id}`,
            title: `${e.activity} - ${e.customer.firstname} ${e.customer.lastname}`,
            start: e.date,
            end,
          }
        });
        setEvents(ev);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <div>
        <FullCalendar 
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          firstDay={1}
          themeSystem=''
        />
      </div>
    </div>
  )
}

export default Calendar;