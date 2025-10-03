'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Calendar } from 'lucide-react';

const mockDeliveries = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    customer: 'Rajesh Kumar',
    address: '123 MG Road, Bangalore',
    status: 'DELIVERED',
    date: '2024-02-01',
    time: '12:30 PM',
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    customer: 'Priya Sharma',
    address: '456 Brigade Road, Bangalore',
    status: 'IN_TRANSIT',
    date: '2024-02-02',
    time: '1:00 PM',
  },
  {
    id: '3',
    orderId: 'ORD-2024-003',
    customer: 'Amit Patel',
    address: '789 Indiranagar, Bangalore',
    status: 'PENDING',
    date: '2024-02-02',
    time: '12:00 PM',
  },
];

export default function AdminDeliveriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' || delivery.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deliveries</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage deliveries
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or order ID..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No deliveries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium font-mono text-sm">
                      {delivery.orderId}
                    </TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {delivery.address}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          delivery.status === 'DELIVERED'
                            ? 'default'
                            : delivery.status === 'IN_TRANSIT'
                            ? 'secondary'
                            : delivery.status === 'PENDING'
                            ? 'outline'
                            : 'destructive'
                        }
                      >
                        {delivery.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(delivery.date).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {delivery.time}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
