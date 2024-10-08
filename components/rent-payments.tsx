"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type RentPayment = {
  id: number;
  propertyId: number;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Late';
};

export default function RentPayments() {
  const [rentPayments, setRentPayments] = useState<RentPayment[]>([]);
  const [newPayment, setNewPayment] = useState({ propertyId: '', amount: '', date: '', status: 'Pending' });

  const addPayment = () => {
    if (newPayment.propertyId && newPayment.amount && newPayment.date) {
      setRentPayments([...rentPayments, { ...newPayment, id: Date.now(), propertyId: parseInt(newPayment.propertyId), amount: parseFloat(newPayment.amount), status: newPayment.status as 'Paid' | 'Pending' | 'Late' }]);
      setNewPayment({ propertyId: '', amount: '', date: '', status: 'Pending' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Rent Payments</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Payment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Payment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="propertyId" className="text-right">
                  Property ID
                </Label>
                <Input
                  id="propertyId"
                  type="number"
                  value={newPayment.propertyId}
                  onChange={(e) => setNewPayment({ ...newPayment, propertyId: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newPayment.date}
                  onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select onValueChange={(value) => setNewPayment({ ...newPayment, status: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addPayment}>Add Payment</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rentPayments.map((payment) => (
          <Card key={payment.id}>
            <CardHeader>
              <CardTitle>Payment for Property ID: {payment.propertyId}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Amount: ${payment.amount}</p>
              <p>Date: {payment.date}</p>
              <p>Status: {payment.status}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}