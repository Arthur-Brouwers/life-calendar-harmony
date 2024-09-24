import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

const ParticipantSelector = ({ selectedParticipants, onParticipantChange }) => {
  const [newParticipant, setNewParticipant] = useState('');

  const handleAddParticipant = () => {
    if (newParticipant.trim() && !selectedParticipants.includes(newParticipant.trim())) {
      onParticipantChange([...selectedParticipants, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const handleRemoveParticipant = (participant) => {
    onParticipantChange(selectedParticipants.filter(p => p !== participant));
  };

  return (
    <div className="space-y-2">
      <Label>Add Participants:</Label>
      <div className="flex space-x-2">
        <Input
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Enter participant name"
          className="flex-grow"
        />
        <Button onClick={handleAddParticipant}>Add</Button>
      </div>
      <div className="mt-2">
        {selectedParticipants.map((participant) => (
          <div key={participant} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {participant}
            <button
              onClick={() => handleRemoveParticipant(participant)}
              className="ml-1 focus:outline-none"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantSelector;
