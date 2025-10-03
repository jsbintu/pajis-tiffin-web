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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, Search, Eye, Pause, Play, XCircle } from 'lucide-react';

const mockSubscriptions = [
  {
    id: '1',
    userName: 'Rajesh Kumar',
    plan: 'Premium',
    status: 'ACTIVE',
    amount: 4999,
    startDate: '2024-01-15',
    nextBilling: '2024-02-15',
  },
  {
    id: '2',
    userName: 'Priya Sharma',
    plan: 'Basic',
    status: 'ACTIVE',
    amount: 2999,
    startDate: '2024-02-01',
    nextBilling: '2024-03-01',
  },
  {
    id: '3',
    userName: 'Amit Patel',
    plan: 'Premium',
    status: 'PAUSED',
    amount: 4999,
    startDate: '2024-01-10',
    nextBilling: null,
  },
];

export default function AdminSubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscriptions = mockSubscriptions.filter((sub) =>
    sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground mt-1">
            Manage customer subscriptions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer or plan..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No subscriptions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.userName}</TableCell>
                    <TableCell>{sub.plan}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sub.status === 'ACTIVE'
                            ? 'default'
                            : sub.status === 'PAUSED'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{sub.amount.toLocaleString()}/mo</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(sub.startDate).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sub.nextBilling
                        ? new Date(sub.nextBilling).toLocaleDateString('en-IN')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {sub.status === 'ACTIVE' && (
                            <DropdownMenuItem>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Subscription
                            </DropdownMenuItem>
                          )}
                          {sub.status === 'PAUSED' && (
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Resume Subscription
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive focus:text-destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
