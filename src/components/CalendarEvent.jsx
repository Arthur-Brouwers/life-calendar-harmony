import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalendarEvent = ({ event }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Time: {event.time}</p>
        <p>Participants: {event.participants.join(', ')}</p>
      </CardContent>
    </Card>
  );
};

export default CalendarEvent;