"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Property = {
  id: number;
  address: string;
  type: string;
  rent: number;
};

export default function PropertiesList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState({ address: '', type: '', rent: '' });

  const addProperty = () => {
    if (newProperty.address && newProperty.type && newProperty.rent) {
      setProperties([...properties, { ...newProperty, id: Date.now(), rent: parseFloat(newProperty.rent) }]);
      setNewProperty({ address: '', type: '', rent: '' });
    }
  };

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Properties</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Property</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={newProperty.address}
                  onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Input
                  id="type"
                  value={newProperty.type}
                  onChange={(e) => setNewProperty({ ...newProperty, type: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rent" className="text-right">
                  Rent
                </Label>
                <Input
                  id="rent"
                  type="number"
                  value={newProperty.rent}
                  onChange={(e) => setNewProperty({ ...newProperty, rent: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addProperty}>Add Property</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle>{property.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {property.type}</p>
              <p>Rent: ${property.rent}</p>
              <Button variant="destructive" onClick={() => deleteProperty(property.id)} className="mt-2">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}