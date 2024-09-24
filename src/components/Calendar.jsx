import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import CalendarEvent from './CalendarEvent';
import ParticipantSelector from './ParticipantSelector';
import { fetchEvents, addEvent, removeEvent, checkAvailability, fetchAllEvents } from '../utils/api';
import { toast } from 'sonner';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: '', startTime: '', endTime: '', participants: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState([]);
  const queryClient = useQueryClient();

  const { data: events = [] } = useQuery({
    queryKey: ['events', date.toISOString().split('T')[0]],
    queryFn: () => fetchEvents(date),
  });

  const { data: allEvents = [] } = useQuery({
    queryKey: ['allEvents'],
    queryFn: fetchAllEvents,
  });

  useEffect(() => {
    if (allEvents.length > 0) {
      const blocked = allEvents.map(event => ({
        date: new Date(event.date),
        startTime: event.startTime,
        endTime: event.endTime
      }));
      setBlockedTimes(blocked);
    }
  }, [allEvents]);

  const addEventMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events', date.toISOString().split('T')[0]]);
      queryClient.invalidateQueries(['allEvents']);
      setNewEvent({ title: '', startTime: '', endTime: '', participants: [] });
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
      queryClient.invalidateQueries(['allEvents']);
      toast.success('Event removed successfully');
    },
    onError: () => {
      toast.error('Failed to remove event');
    },
  });

  const handleAddEvent = async () => {
    const isAvailable = await checkAvailability({
      ...newEvent,
      date: date.toISOString().split('T')[0]
    });
    if (isAvailable) {
      addEventMutation.mutate({ ...newEvent, date: date.toISOString().split('T')[0] });
    } else {
      toast.error('The selected time slot is not available. Please choose a different time.');
    }
  };

  const handleRemoveEvent = (eventId) => {
    removeEventMutation.mutate(eventId);
  };

  const handleParticipantChange = (participants) => {
    setNewEvent({ ...newEvent, participants });
  };

  const isTimeBlocked = (date, time) => {
    return blockedTimes.some(blockedTime => 
      blockedTime.date.toDateString() === date.toDateString() &&
      time >= blockedTime.startTime &&
      time < blockedTime.endTime
    );
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  className="col-span-3"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  className="col-span-3"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
              </div>
              <ParticipantSelector
                selectedParticipants={newEvent.participants}
                onParticipantChange={handleParticipantChange}
              />
              <Button onClick={handleAddEvent}>Save Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <h2 className="text-2xl font-bold mb-4">Planned Activities for {date.toDateString()}</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <CalendarEvent key={event.id} event={event} onRemove={handleRemoveEvent} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
