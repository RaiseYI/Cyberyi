"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FinancialData = {
  month: string;
  income: number;
  expenses: number;
};

export default function FinancialReports() {
  const [reportType, setReportType] = useState('monthly');
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);

  useEffect(() => {
    // In a real application, this data would come from an API or database
    const mockData: FinancialData[] = [
      { month: 'Jan', income: 5000, expenses: 3000 },
      { month: 'Feb', income: 5200, expenses: 3100 },
      { month: 'Mar', income: 5100, expenses: 3200 },
      { month: 'Apr', income: 5300, expenses: 3150 },
      { month: 'May', income: 5400, expenses: 3250 },
      { month: 'Jun', income: 5600, expenses: 3300 },
    ];
    setFinancialData(mockData);
  }, []);

  const calculateTotals = () => {
    const totalIncome = financialData.reduce((sum, data) => sum + data.income, 0);
    const totalExpenses = financialData.reduce((sum, data) => sum + data.expenses, 0);
    const netProfit = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, netProfit };
  };

  const { totalIncome, totalExpenses, netProfit } = calculateTotals();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Financial Reports</h2>
        <Select onValueChange={setReportType} defaultValue={reportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpenses.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${netProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="expenses" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}