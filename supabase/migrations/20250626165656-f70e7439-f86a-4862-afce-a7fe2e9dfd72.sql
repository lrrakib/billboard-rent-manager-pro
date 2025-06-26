
-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create land owners table
CREATE TABLE public.land_owners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced billboards table with partner and land owner relationships
CREATE TABLE public.billboards_enhanced (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  location TEXT NOT NULL,
  size TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Digital', 'Static')),
  status TEXT NOT NULL CHECK (status IN ('Available', 'Rented', 'Maintenance', 'Under Construction')) DEFAULT 'Available',
  land_owner_id UUID REFERENCES public.land_owners(id),
  rent_amount DECIMAL(10,2),
  installation_cost DECIMAL(12,2),
  installation_date DATE,
  agreement_start_date DATE,
  agreement_end_date DATE,
  payment_month INTEGER CHECK (payment_month BETWEEN 1 AND 12),
  agreement_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner investments table
CREATE TABLE public.partner_investments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES public.partners(id) NOT NULL,
  billboard_id UUID REFERENCES public.billboards_enhanced(id) NOT NULL,
  investment_percentage DECIMAL(5,2) NOT NULL CHECK (investment_percentage > 0 AND investment_percentage <= 100),
  investment_amount DECIMAL(12,2) NOT NULL,
  investment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  purpose TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create installation costs log table
CREATE TABLE public.installation_costs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  billboard_id UUID REFERENCES public.billboards_enhanced(id) NOT NULL,
  partner_id UUID REFERENCES public.partners(id),
  cost_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT CHECK (payment_method IN ('Cash', 'Cheque', 'MFS', 'Bank Transfer')),
  description TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create land owner payments table
CREATE TABLE public.land_owner_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  land_owner_id UUID REFERENCES public.land_owners(id) NOT NULL,
  billboard_id UUID REFERENCES public.billboards_enhanced(id) NOT NULL,
  payment_year_start DATE NOT NULL,
  payment_year_end DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE,
  payment_method TEXT CHECK (payment_method IN ('Cash', 'Cheque', 'MFS', 'Bank Transfer')),
  status TEXT NOT NULL CHECK (status IN ('Pending', 'Paid', 'Overdue')) DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create enhanced clients table
CREATE TABLE public.clients_enhanced (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  industry TEXT,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  billing_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rentals table
CREATE TABLE public.billboard_rentals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients_enhanced(id) NOT NULL,
  billboard_id UUID REFERENCES public.billboards_enhanced(id) NOT NULL,
  rental_amount DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  invoice_date INTEGER NOT NULL CHECK (invoice_date BETWEEN 1 AND 31),
  invoice_frequency TEXT NOT NULL CHECK (invoice_frequency IN ('Monthly', 'Quarterly', 'Yearly')) DEFAULT 'Monthly',
  status TEXT NOT NULL CHECK (status IN ('Active', 'Expired', 'Cancelled')) DEFAULT 'Active',
  contract_document_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client payments table
CREATE TABLE public.client_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_id UUID REFERENCES public.billboard_rentals(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT CHECK (payment_method IN ('Cash', 'Cheque', 'MFS', 'Bank Transfer')),
  invoice_period_start DATE NOT NULL,
  invoice_period_end DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Received', 'Pending', 'Overdue')) DEFAULT 'Received',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billboards_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installation_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.land_owner_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billboard_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_payments ENABLE ROW LEVEL SECURITY;

-- Create policies (allowing all operations for now - you can restrict later)
CREATE POLICY "Enable all operations for partners" ON public.partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for land_owners" ON public.land_owners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for billboards_enhanced" ON public.billboards_enhanced FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for partner_investments" ON public.partner_investments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for installation_costs" ON public.installation_costs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for land_owner_payments" ON public.land_owner_payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for clients_enhanced" ON public.clients_enhanced FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for billboard_rentals" ON public.billboard_rentals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all operations for client_payments" ON public.client_payments FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_partner_investments_billboard ON public.partner_investments(billboard_id);
CREATE INDEX idx_partner_investments_partner ON public.partner_investments(partner_id);
CREATE INDEX idx_installation_costs_billboard ON public.installation_costs(billboard_id);
CREATE INDEX idx_land_owner_payments_owner ON public.land_owner_payments(land_owner_id);
CREATE INDEX idx_land_owner_payments_status ON public.land_owner_payments(status);
CREATE INDEX idx_billboard_rentals_client ON public.billboard_rentals(client_id);
CREATE INDEX idx_billboard_rentals_billboard ON public.billboard_rentals(billboard_id);
CREATE INDEX idx_client_payments_rental ON public.client_payments(rental_id);
