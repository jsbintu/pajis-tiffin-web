import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Users, 
  CreditCard, 
  Package, 
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';

// Mock data - replace with actual API calls
async function getAdminStats() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return {
    totalUsers: 1247,
    activeSubscriptions: 892,
    revenue: 45678.50,
    pendingDeliveries: 156,
    recentGrowth: 12.5,
    monthlyRevenue: 38900,
  };
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description,
  trend 
}: { 
  title: string; 
  value: string | number; 
  icon: any; 
  description?: string;
  trend?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

async function AdminStatsContent() {
  const stats = await getAdminStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Users"
        value={stats.totalUsers.toLocaleString()}
        icon={Users}
        trend="+12.5% from last month"
      />
      <StatCard
        title="Active Subscriptions"
        value={stats.activeSubscriptions.toLocaleString()}
        icon={Package}
        description={`${Math.round((stats.activeSubscriptions / stats.totalUsers) * 100)}% conversion rate`}
      />
      <StatCard
        title="Total Revenue"
        value={`₹${stats.revenue.toLocaleString()}`}
        icon={DollarSign}
        trend="+8.2% from last month"
      />
      <StatCard
        title="Pending Deliveries"
        value={stats.pendingDeliveries}
        icon={Calendar}
        description="For today"
      />
      <StatCard
        title="Monthly Revenue"
        value={`₹${stats.monthlyRevenue.toLocaleString()}`}
        icon={CreditCard}
        description="Current month"
      />
      <StatCard
        title="Growth Rate"
        value={`${stats.recentGrowth}%`}
        icon={TrendingUp}
        description="Month over month"
      />
    </div>
  );
}

function AdminStatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your Pajis Kitchen operations
        </p>
      </div>

      <Suspense fallback={<AdminStatsLoading />}>
        <AdminStatsContent />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Activity feed coming soon...
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Quick action buttons coming soon...
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
