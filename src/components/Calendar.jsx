import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CalendarEvent from './CalendarEvent';
import ParticipantSelector from './ParticipantSelector';
import { fetchEvents, addEvent, removeEvent, checkAvailability } from '../utils/api';
import { toast } from 'sonner';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: '', time: '', participants: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery({
    queryKey: ['events', date.toISOString().split('T')[0]],
    queryFn: () => fetchEvents(date),
  });

  const addEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events', date.toISOString().split('T')[0]]);
      setNewEvent({ title: '', time: '', participants: [] });
      setIsDialogOpen(false);
      toast.success('Event added successfully');
    },
    onError: () => {
      toast.error('Failed to add event');
    },
  });

  const removeEventMutation = useMutation({
    mutationFn: removeEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events', date.toISOString().split('T')[0]]);
      toast.success('Event removed successfully');
    },
    onError: () => {
      toast.error('Failed to remove event');
    },
  });

  const handleAddEvent = async () => {
    const isAvailable = await checkAvailability(newEvent);
    if (isAvailable) {
      addEventMutation.mutate({ ...newEvent, date: date.toISOString().split('T')[0] });
    } else {
      toast.error('One or more participants are not available at this time');
    }
  };

  const handleRemoveEvent = (eventId) => {
    removeEventMutation.mutate(eventId);
  };

  const handleParticipantChange = (participants) => {
    setNewEvent({ ...newEvent, participants });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <CalendarUI
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md border"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <Input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
              <ParticipantSelector
                selectedParticipants={newEvent.participants}
                onParticipantChange={handleParticipantChange}
              />
              <Button onClick={handleAddEvent}>Save Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} onRemove={handleRemoveEvent} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
