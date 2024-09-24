import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const participants = ['Alice', 'Bob', 'Charlie', 'David']; // Mock list of participants

const ParticipantSelector = ({ selectedParticipants, onParticipantChange }) => {
  const handleParticipantToggle = (participant) => {
    const updatedParticipants = selectedParticipants.includes(participant)
      ? selectedParticipants.filter((p) => p !== participant)
      : [...selectedParticipants, participant];
    onParticipantChange(updatedParticipants);
  };

  return (
    <div className="space-y-2">
      <Label>Select Participants:</Label>
      {participants.map((participant) => (
        <div key={participant} className="flex items-center space-x-2">
          <Checkbox
            id={participant}
            checked={selectedParticipants.includes(participant)}
            onCheckedChange={() => handleParticipantToggle(participant)}
          />
          <Label htmlFor={participant}>{participant}</Label>
        </div>
      ))}
    </div>
  );
};

export default ParticipantSelector;