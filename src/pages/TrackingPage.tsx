import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Filter, Download, Calendar, Store } from 'lucide-react';
import { format } from 'date-fns';
import type { OptIn, OptInFilters } from '@/types';

const TrackingPage = () => {
  const [optIns, setOptIns] = useState<OptIn[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<OptInFilters>({
    storeId: 'all',
    month: format(new Date(), 'yyyy-MM'),
    status: 'all',
    search: '',
  });

  // Mock stores data - in real app, this would come from API
  const stores = [
    { id: '1', name: 'My E-commerce Store' },
    { id: '2', name: 'Another Store' },
    { id: '3', name: 'Test Store' },
  ];

  // Mock opt-ins data - in real app, this would come from API
  const mockOptIns: OptIn[] = [
    {
      id: '1',
      storeId: '1',
      storeName: 'My E-commerce Store',
      merchantId: 'merchant1',
      merchantName: 'John Doe',
      customerEmail: 'customer1@example.com',
      customerName: 'Alice Johnson',
      optInDate: '2024-01-15T10:30:00Z',
      source: 'widget',
      status: 'active',
    },
    {
      id: '2',
      storeId: '1',
      storeName: 'My E-commerce Store',
      merchantId: 'merchant1',
      merchantName: 'John Doe',
      customerEmail: 'customer2@example.com',
      customerName: 'Bob Smith',
      optInDate: '2024-01-14T15:45:00Z',
      source: 'api',
      status: 'active',
    },
    {
      id: '3',
      storeId: '2',
      storeName: 'Another Store',
      merchantId: 'merchant2',
      merchantName: 'Jane Smith',
      customerEmail: 'customer3@example.com',
      customerName: 'Charlie Brown',
      optInDate: '2024-01-13T09:15:00Z',
      source: 'widget',
      status: 'inactive',
    },
  ];

  useEffect(() => {
    // In real app, this would call the API
    setOptIns(mockOptIns);
    setTotal(mockOptIns.length);
    setTotalPages(Math.ceil(mockOptIns.length / 10));
  }, []);

  const handleFilterChange = (key: keyof OptInFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSearch = () => {
    // In real app, this would trigger an API call with the current filters
    console.log('Searching with filters:', filters);
  };

  const handleExport = async () => {
    try {
      // In real app, this would call the export API
      console.log('Exporting with filters:', filters);
      // const blob = await optInApi.export(filters);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `opt-ins-${filters.month || 'all-time'}.csv`;
      // a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    );
  };

  const getSourceBadge = (source: string) => {
    const sourceColors = {
      widget: 'bg-blue-100 text-blue-800',
      api: 'bg-purple-100 text-purple-800',
      manual: 'bg-orange-100 text-orange-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sourceColors[source as keyof typeof sourceColors]}`}>
        {source}
      </span>
    );
  };

  // Filter opt-ins based on current filters
  const filteredOptIns = optIns.filter(optIn => {
    if (filters.storeId !== 'all' && optIn.storeId !== filters.storeId) return false;
    if (filters.status !== 'all' && optIn.status !== filters.status) return false;
    if (filters.search && !optIn.customerName?.toLowerCase().includes(filters.search.toLowerCase()) && !optIn.customerEmail.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opt-ins</h1>
          <p className="text-gray-500">
            Monitor customer carbon offset opt-ins
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
            Filter opt-ins by store, month, or status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="store">Store</Label>
              <Select value={filters.storeId} onValueChange={(value) => handleFilterChange('storeId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All stores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stores</SelectItem>
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

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleSearch}>
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opt-ins Table */}
      <Card>
        <CardHeader>
          <CardTitle>Opt-ins</CardTitle>
          <CardDescription>
            Showing {filteredOptIns.length} of {total} opt-ins
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOptIns.map((optIn) => (
                <TableRow key={optIn.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{optIn.customerName || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{optIn.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Store className="w-4 h-4 text-gray-500" />
                      <span>{optIn.storeName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(optIn.status)}</TableCell>
                  <TableCell>
                    {format(new Date(optIn.optInDate), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingPage;
