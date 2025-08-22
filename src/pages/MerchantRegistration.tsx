import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { merchantApi } from '@/services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

const merchantSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type MerchantFormData = z.infer<typeof merchantSchema>;

const MerchantRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
  });

  const onSubmit = async (data: MerchantFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Filter out empty website field
      const submitData = {
        ...data,
        website: data.website || undefined,
      };

      await merchantApi.register(submitData);
      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Add Merchant</h1>
        <p className="text-muted-foreground">
          Offer carbon offset options to your customers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Fill in the details below to register your store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register('name')}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Store Name *</Label>
              <Input
                id="company"
                placeholder="Enter your company name"
                {...register('company')}
                className={errors.company ? 'border-destructive' : ''}
              />
              {errors.company && (
                <p className="text-sm text-destructive">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Store URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourwebsite.com"
                {...register('website')}
                className={errors.website ? 'border-destructive' : ''}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website.message}</p>
              )}
            </div>

            {submitStatus === 'success' && (
              <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-800">
                  Registration successful! Welcome to Offset CF. You can now add stores and configure your widget.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800">{errorMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-4">What happens next?</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-bold">1</span>
            </div>
            <h4 className="font-medium">Account Created</h4>
            <p className="text-sm text-muted-foreground">Your merchant account is set up</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-bold">2</span>
            </div>
            <h4 className="font-medium">Add Stores</h4>
            <p className="text-sm text-muted-foreground">Connect your e-commerce stores</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary font-bold">3</span>
            </div>
            <h4 className="font-medium">Configure Widget</h4>
            <p className="text-sm text-muted-foreground">Customize your carbon offset widget</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegistration;
