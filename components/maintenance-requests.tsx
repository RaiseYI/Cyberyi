"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type MaintenanceRequest = {
  id: number;
  propertyId: number;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Closed';
};

export default function MaintenanceRequests() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [newRequest, setNewRequest] = useState({ propertyId: '', description: '', priority: 'Low', status: 'Open' });

  const addRequest = () => {
    if (newRequest.propertyId && newRequest.description) {
      setRequests([...requests, { ...newRequest, id: Date.now(), propertyId: parseInt(newRequest.propertyId), priority: newRequest.priority as 'Low' | 'Medium' | 'High', status: newRequest.status as 'Open' | 'In Progress' | 'Closed' }]);
      setNewRequest({ propertyId: '', description: '', priority: 'Low', status: 'Open' });
    }
  };

  const updateRequestStatus = (id: number, newStatus: 'Open' | 'In Progress' | 'Closed') => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Request</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Maintenance Request</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="propertyId" className="text-right">
                  Property ID
                </Label>
                <Input
                  id="propertyId"
                  type="number"
                  value={newRequest.propertyId}
                  onChange={(e) => setNewRequest({ ...newRequest, propertyId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addRequest}>Submit Request</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>Request for Property ID: {request.propertyId}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Description: {request.description}</p>
              <p>Priority: {request.priority}</p>
              <p>Status: {request.status}</p>
              <Select onValueChange={(value) => updateRequestStatus(request.id, value as 'Open' | 'In Progress' | 'Closed')}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}