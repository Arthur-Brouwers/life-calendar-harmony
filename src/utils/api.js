// Mock data storage with predefined events
let events = [
  { id: 1, title: 'Team Meeting', date: '2024-03-15', startTime: '10:00', endTime: '11:00', participants: ['Alice', 'Bob'] },
  { id: 2, title: 'Project Deadline', date: '2024-03-20', startTime: '09:00', endTime: '17:00', participants: ['Charlie', 'David'] },
  { id: 3, title: 'Lunch with Client', date: '2024-03-25', startTime: '12:30', endTime: '14:00', participants: ['Alice', 'Charlie'] },
  { id: 4, title: 'Company Retreat', date: '2024-04-01', startTime: '09:00', endTime: '17:00', participants: ['Alice', 'Bob', 'Charlie', 'David'] },
  { id: 5, title: 'Product Launch', date: '2024-04-15', startTime: '14:00', endTime: '16:00', participants: ['Alice', 'Bob', 'Charlie', 'David'] },
];

export const fetchEvents = async (date) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return events.filter((event) => event.date === date.toISOString().split('T')[0]);
};

export const addEvent = async (newEvent) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const event = {
    id: events.length + 1,
    ...newEvent,
  };
  events.push(event);
  return event;
};

export const removeEvent = async (eventId) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  events = events.filter((event) => event.id !== eventId);
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const checkAvailability = async (newEvent) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const newEventStart = timeToMinutes(newEvent.startTime);
  const newEventEnd = timeToMinutes(newEvent.endTime);

  // Check if any event conflicts with the new event
  const conflictingEvents = events.filter(
    (event) =>
      event.date === newEvent.date &&
      ((newEventStart >= timeToMinutes(event.startTime) && newEventStart < timeToMinutes(event.endTime)) ||
       (newEventEnd > timeToMinutes(event.startTime) && newEventEnd <= timeToMinutes(event.endTime)) ||
       (newEventStart <= timeToMinutes(event.startTime) && newEventEnd >= timeToMinutes(event.endTime))) &&
      event.participants.some((participant) => newEvent.participants.includes(participant))
  );

  return conflictingEvents.length === 0;
};

export const fetchAllEvents = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return events;
};
