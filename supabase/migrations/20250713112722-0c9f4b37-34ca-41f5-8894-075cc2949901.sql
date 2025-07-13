-- Fix infinite recursion in user_profiles RLS policies

-- Drop problematic recursive policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.user_profiles;

-- Create security definer function to check user role without triggering RLS
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.user_profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Recreate policies using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.user_profiles 
FOR SELECT 
USING (public.get_current_user_role() IN ('admin', 'super_admin'));

CREATE POLICY "Admins can update all profiles" 
ON public.user_profiles 
FOR UPDATE 
USING (public.get_current_user_role() IN ('admin', 'super_admin'));