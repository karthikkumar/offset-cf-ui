import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, BarChart3, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Merchants',
      value: '24',
      description: 'Active merchants',
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Stores',
      value: '156',
      description: 'Connected stores',
      icon: Store,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Opt-ins',
      value: '2,847',
      description: 'This month',
      icon: BarChart3,
      change: '+23%',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      description: 'Avg. conversion',
      icon: TrendingUp,
      change: '+0.8%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor carbon offset performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Opt-ins</CardTitle>
            <CardDescription>Latest customer opt-ins across all stores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New opt-in from Store {i}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Add New Store</div>
                <div className="text-sm text-muted-foreground">Connect a new e-commerce store</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Configure Widget</div>
                <div className="text-sm text-muted-foreground">Customize your carbon offset widget</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">Download opt-in reports</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
