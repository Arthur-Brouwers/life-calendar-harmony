import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const CalendarEvent = ({ event, onRemove }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{event.title}</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => onRemove(event.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p>Time: {event.time}</p>
        <p>Participants: {event.participants.join(', ')}</p>
      </CardContent>
    </Card>
  );
};

export default CalendarEvent;
