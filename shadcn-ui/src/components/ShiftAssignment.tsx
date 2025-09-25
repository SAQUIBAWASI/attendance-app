import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useData } from '@/contexts/DataContext';
import { Employee, Shift } from '@/types';
import React, { useEffect, useState } from 'react';

interface ShiftAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ShiftAssignment: React.FC<ShiftAssignmentProps> = ({ isOpen, onClose, employee }) => {
  const { assignShift, getEmployeeShift } = useData();
  const [formData, setFormData] = useState({
    type: 'weekly' as 'weekly' | 'monthly',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    days: [] as string[]
  });

  const currentShift = employee ? getEmployeeShift(employee.id) : null;

  // Reset / Prefill form
  useEffect(() => {
    if (!isOpen) return;

    if (currentShift) {
      // Prefill with existing shift data
      setFormData({
        type: currentShift.type,
        startDate: currentShift.startDate,
        endDate: currentShift.endDate,
        startTime: currentShift.startTime,
        endTime: currentShift.endTime,
        days: currentShift.days
      });
    } else {
      // Default new shift
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      setFormData({
        type: 'weekly',
        startDate: today.toISOString().split('T')[0],
        endDate: nextWeek.toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      });
    }
  }, [currentShift, isOpen]);

  const handleDayToggle = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      days: checked
        ? [...prev.days, day]
        : prev.days.filter(d => d !== day)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    const shift: Shift = {
      id: currentShift ? currentShift.id : `${employee.id}-${Date.now()}`, // ✅ update if exists
      employeeId: employee.id,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      days: formData.days,
      status: 'active'
    };

    assignShift(shift);
    onClose(); // ✅ close after submit
  };

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{currentShift ? 'Update Shift' : 'Assign Shift'}</DialogTitle>
          <DialogDescription>
            {currentShift
              ? `Update shift details for ${employee.name} (${employee.employeeId})`
              : `Assign a new shift to ${employee.name} (${employee.employeeId})`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Shift type */}
          <div className="space-y-2">
            <Label>Shift Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'weekly' | 'monthly') =>
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, startDate: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, endDate: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, startTime: e.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, endTime: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Working Days */}
          <div className="space-y-2">
            <Label>Working Days</Label>
            <div className="grid grid-cols-2 gap-2">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={day}
                    checked={formData.days.includes(day)}
                    onCheckedChange={(checked) =>
                      handleDayToggle(day, checked as boolean)
                    }
                  />
                  <Label htmlFor={day} className="text-sm">
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {currentShift ? 'Update Shift' : 'Assign Shift'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftAssignment;
