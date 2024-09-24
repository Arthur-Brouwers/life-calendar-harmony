// Mock data storage
let events = [
  { id: 1, title: 'Team Meeting', date: '2023-04-15', time: '10:00', participants: ['Alice', 'Bob'] },
  { id: 2, title: 'Family Dinner', date: '2023-04-15', time: '18:00', participants: ['Mom', 'Dad', 'Sister'] },
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
    participants: ['You'], // For simplicity, we're adding only the current user
  };
  events.push(event);
  return event;
};