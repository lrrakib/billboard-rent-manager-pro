-- Fix the security issue: Update trigger to create new users as 'viewer' by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Manually promote jefranulislam@gmail.com to admin role
-- First, find the user_id for jefranulislam@gmail.com and update their role
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email = 'jefranulislam@gmail.com'
);