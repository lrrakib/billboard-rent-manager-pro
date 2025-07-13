-- Update trigger to make first user super_admin, subsequent users viewer
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Check if this is the first user in the database
  SELECT COUNT(*) INTO user_count FROM public.user_profiles;
  
  -- If this is the first user, make them super_admin, otherwise viewer
  INSERT INTO public.user_profiles (user_id, full_name, role)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'full_name', 
    CASE WHEN user_count = 0 THEN 'super_admin' ELSE 'viewer' END
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update jefranulislam@gmail.com to super_admin role
UPDATE public.user_profiles 
SET role = 'super_admin' 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email = 'jefranulislam@gmail.com'
);