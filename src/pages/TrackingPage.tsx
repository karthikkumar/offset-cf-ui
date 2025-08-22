import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Filter, Download, Calendar, Store } from 'lucide-react';
import { format } from 'date-fns';
import type { DailyOptInData, OptInFilters } from '@/types';
import { optInApi } from '@/services/api';

const TrackingPage = () => {
  const [dailyData, setDailyData] = useState<DailyOptInData[]>([]);
  const [totals, setTotals] = useState({ opt_ins: 0, estimated_offset: 0 });
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<OptInFilters>({
    store_id: 'ecocart-widget.myshopify.com', // Set default store
    month: format(new Date(), 'yyyy-MM'),
  });

  // Mock stores data - in real app, this would come from store API
  const stores = [
    { id: 'ecocart-widget.myshopify.com', name: 'Ecocart Widget' },
    { id: 'teatotaler.myshopify.com', name: 'Teatotaler' },
  ];

  const fetchOptIns = async () => {
    if (!filters.store_id) return; // Don't fetch if no store selected
    
    setLoading(true);
    try {
      const response = await optInApi.getMonthlySummary(filters);
      setDailyData(response.daily);
      setTotals(response.totals);
      setCurrency(response.currency);
    } catch (error) {
      console.error('Failed to fetch opt-ins:', error);
      // Fallback to empty data
      setDailyData([]);
      setTotals({ opt_ins: 0, estimated_offset: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptIns();
  }, [filters]);

  const handleFilterChange = (key: keyof OptInFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchOptIns();
  };

  const handleExport = async () => {
    try {
      const blob = await optInApi.export(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `opt-ins-${filters.month || 'all-time'}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Use daily data directly from API response
  const dailyOptIns = dailyData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opt-ins</h1>
          <p className="text-gray-500">
            Monitor and analyze customer carbon offset opt-ins across all your stores
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
          <CardDescription>
            Filter opt-ins by store, month, status, or search terms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Select value={filters.store_id} onValueChange={(value) => handleFilterChange('store_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All stores" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="month"
                  type="month"
                  value={filters.month}
                  onChange={(e) => handleFilterChange('month', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Loading...' : 'Apply Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Store className="w-5 h-5 mr-2" />
            Monthly Summary
          </CardTitle>
          <CardDescription>
            Overview of opt-ins and carbon offset for {filters.month}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Opt-ins</p>
                <p className="text-3xl font-bold text-blue-600">{totals.opt_ins}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Estimated Carbon Offset</p>
                <p className="text-3xl font-bold text-green-600">
                  {totals.estimated_offset.toFixed(2)} {currency}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opt-ins Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Opt-ins Summary</CardTitle>
          <CardDescription>
            Showing {dailyOptIns?.length} days of data - Total: {totals.opt_ins} opt-ins, {totals.estimated_offset.toFixed(2)} {currency} offset
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading opt-ins...</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Daily Opt-ins</TableHead>
                    <TableHead>Estimated Offset</TableHead>
                    <TableHead>Currency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyOptIns?.map((daily) => (
                    <TableRow key={daily.day}>
                      <TableCell>
                        <div className="font-medium">
                          {format(new Date(daily.day), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {format(new Date(daily.day), 'EEEE')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Store className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-lg">{daily.opt_ins}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">
                          {daily.estimated_offset.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-600">{currency}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingPage;
