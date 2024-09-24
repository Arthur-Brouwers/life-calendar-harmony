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

export const checkAvailability = async (newEvent) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Check if any participant has a conflicting event
  const conflictingEvents = events.filter(
    (event) =>
      event.date === newEvent.date &&
      ((newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
       (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime) ||
       (newEvent.startTime <= event.startTime && newEvent.endTime >= event.endTime)) &&
      event.participants.some((participant) => newEvent.participants.includes(participant))
  );

  return conflictingEvents.length === 0;
};

export const fetchAllEvents = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return events;
};
