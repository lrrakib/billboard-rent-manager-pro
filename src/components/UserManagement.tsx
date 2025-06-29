
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Users, Shield, AlertCircle } from 'lucide-react';

const UserManagement = () => {
  const { userRole } = useAuth();

  if (userRole !== 'admin') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You need admin privileges to access user management.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Manage user roles and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-800">Database Migration Required</p>
            <p className="text-sm text-blue-700">
              User management functionality will be available after the database migration is applied.
              Please run the SQL migration first to create the user_profiles table.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
