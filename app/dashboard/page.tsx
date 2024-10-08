"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PropertiesList from '@/components/properties-list';
import RentPayments from '@/components/rent-payments';
import MaintenanceRequests from '@/components/maintenance-requests';
import FinancialReports from '@/components/financial-reports';
import { useLanguage } from '@/components/language-provider';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('properties');
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.title')}</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="properties">{t('properties.title')}</TabsTrigger>
          <TabsTrigger value="rent">{t('rent.title')}</TabsTrigger>
          <TabsTrigger value="maintenance">{t('maintenance.title')}</TabsTrigger>
          <TabsTrigger value="reports">{t('reports.title')}</TabsTrigger>
        </TabsList>
        <TabsContent value="properties">
          <PropertiesList />
        </TabsContent>
        <TabsContent value="rent">
          <RentPayments />
        </TabsContent>
        <TabsContent value="maintenance">
          <MaintenanceRequests />
        </TabsContent>
        <TabsContent value="reports">
          <FinancialReports />
        </TabsContent>
      </Tabs>
    </div>
  );
}