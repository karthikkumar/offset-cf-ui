import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Plus, Settings, ExternalLink } from 'lucide-react';

const storeSchema = z.object({
  name: z.string().min(2, 'Store name must be at least 2 characters'),
  domain: z.string().min(1, 'Domain is required'),
  position: z.enum(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  theme: z.enum(['light', 'dark', 'auto']),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color'),
  textColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Please enter a valid hex color'),
  customMessage: z.string().optional(),
});

type StoreFormData = z.infer<typeof storeSchema>;

interface StoreData {
  id: string;
  name: string;
  domain: string;
  widgetConfig: {
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    theme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    textColor: string;
    enabled: boolean;
    customMessage?: string;
  };
}

const StoreManagement = () => {
  const [isAddingStore, setIsAddingStore] = useState(false);
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: '1',
      name: 'My E-commerce Store',
      domain: 'mystore.com',
      widgetConfig: {
        position: 'bottom-right',
        theme: 'auto',
        primaryColor: '#10b981',
        textColor: '#ffffff',
        enabled: true,
        customMessage: 'Help us offset carbon emissions!',
      },
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      position: 'bottom-right',
      theme: 'auto',
      primaryColor: '#10b981',
      textColor: '#ffffff',
    },
  });

  // Removed widget preview section and related watchers

  const onSubmit = async (data: StoreFormData) => {
    const newStore: StoreData = {
      id: Date.now().toString(),
      name: data.name,
      domain: data.domain,
      widgetConfig: {
        position: data.position,
        theme: data.theme,
        primaryColor: data.primaryColor,
        textColor: data.textColor,
        enabled: true,
        customMessage: data.customMessage,
      },
    };

    setStores([...stores, newStore]);
    setIsAddingStore(false);
    reset();
  };

  const toggleWidget = (storeId: string) => {
    setStores(stores.map(store => 
      store.id === storeId 
        ? { ...store, widgetConfig: { ...store.widgetConfig, enabled: !store.widgetConfig.enabled } }
        : store
    ));
  };

  const deleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configure Widget</h1>
          <p className="text-muted-foreground">
            Configure carbon offset widgets
          </p>
        </div>
        <Button onClick={() => setIsAddingStore(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Store
        </Button>
      </div>

      {/* Add Store Form */}
      {isAddingStore && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Store</CardTitle>
            <CardDescription>
              Connect a new e-commerce store and configure its carbon offset widget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Store Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter store name"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Domain *</Label>
                  <Input
                    id="domain"
                    placeholder="yourstore.com"
                    {...register('domain')}
                    className={errors.domain ? 'border-destructive' : ''}
                  />
                  {errors.domain && (
                    <p className="text-sm text-destructive">{errors.domain.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="position">Widget Position *</Label>
                  <Select onValueChange={(value) => setValue('position', value as any)} defaultValue="bottom-right">
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme *</Label>
                  <Select onValueChange={(value) => setValue('theme', value as any)} defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      {...register('primaryColor')}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      placeholder="#10b981"
                      {...register('primaryColor')}
                      className={errors.primaryColor ? 'border-destructive' : ''}
                    />
                  </div>
                  {errors.primaryColor && (
                    <p className="text-sm text-destructive">{errors.primaryColor.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="textColor"
                      type="color"
                      {...register('textColor')}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      placeholder="#ffffff"
                      {...register('textColor')}
                      className={errors.textColor ? 'border-destructive' : ''}
                    />
                  </div>
                  {errors.textColor && (
                    <p className="text-sm text-destructive">{errors.textColor.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                <Input
                  id="customMessage"
                  placeholder="Help us offset carbon emissions!"
                  {...register('customMessage')}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Add Store</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingStore(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      

      {/* Stores List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Connected Stores</h2>
        {stores.map((store) => (
          <Card key={store.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{store.name}</h3>
                    <p className="text-sm text-muted-foreground">{store.domain}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={store.widgetConfig.enabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleWidget(store.id)}
                  >
                    {store.widgetConfig.enabled ? 'Enabled' : 'Disabled'}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteStore(store.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoreManagement;
