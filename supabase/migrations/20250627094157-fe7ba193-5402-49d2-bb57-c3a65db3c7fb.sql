
-- Update billboards_enhanced table with new fields
ALTER TABLE public.billboards_enhanced 
ADD COLUMN billboard_identifier TEXT UNIQUE,
ADD COLUMN total_sft DECIMAL(8,2),
ADD COLUMN image_urls TEXT[],
ADD COLUMN total_installation_cost DECIMAL(12,2) DEFAULT 0;

-- Update type constraint to include new billboard types
ALTER TABLE public.billboards_enhanced 
DROP CONSTRAINT IF EXISTS billboards_enhanced_type_check;

ALTER TABLE public.billboards_enhanced 
ADD CONSTRAINT billboards_enhanced_type_check 
CHECK (type IN ('Billboard', 'Unipole', 'Neon Sign Only'));

-- Update installation_costs table with more specific cost types
ALTER TABLE public.installation_costs 
DROP CONSTRAINT IF EXISTS installation_costs_cost_type_check;

-- Add new cost types for billboard installation
ALTER TABLE public.installation_costs 
ADD CONSTRAINT installation_costs_cost_type_check 
CHECK (cost_type IN (
  'Agreement Payment', 
  'Structure Cost', 
  'Installation Cost', 
  'PVC Cost', 
  'PVC Fitting Cost', 
  'Painting Cost', 
  'VAT', 
  'Tax', 
  'Transport Cost',
  'Labor Cost',
  'Electrical Cost',
  'Permit Cost',
  'Other'
));

-- Create billboard documents table for storing agreement papers and other documents
CREATE TABLE public.billboard_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  billboard_id UUID REFERENCES public.billboards_enhanced(id) NOT NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('Agreement', 'Permit', 'Receipt', 'Photo', 'Other')),
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create billboard profit calculations view
CREATE OR REPLACE VIEW public.billboard_profit_summary AS
SELECT 
  b.id,
  b.billboard_identifier,
  b.location,
  b.total_installation_cost,
  COALESCE(SUM(r.rental_amount), 0) as total_yearly_rental,
  COALESCE(SUM(r.rental_amount), 0) - COALESCE(b.total_installation_cost, 0) as total_profit,
  COUNT(DISTINCT pi.partner_id) as partner_count
FROM public.billboards_enhanced b
LEFT JOIN public.billboard_rentals r ON b.id = r.billboard_id AND r.status = 'Active'
LEFT JOIN public.partner_investments pi ON b.id = pi.billboard_id
GROUP BY b.id, b.billboard_identifier, b.location, b.total_installation_cost;

-- Create partner profit share view
CREATE OR REPLACE VIEW public.partner_profit_share AS
SELECT 
  pi.partner_id,
  p.name as partner_name,
  pi.billboard_id,
  b.billboard_identifier,
  b.location,
  pi.investment_percentage,
  pi.investment_amount,
  bps.total_yearly_rental,
  bps.total_profit,
  (bps.total_profit * pi.investment_percentage / 100) as partner_profit_share
FROM public.partner_investments pi
JOIN public.partners p ON pi.partner_id = p.id
JOIN public.billboards_enhanced b ON pi.billboard_id = b.id
JOIN public.billboard_profit_summary bps ON b.id = bps.id;

-- Add RLS policy for new tables
ALTER TABLE public.billboard_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all operations for billboard_documents" ON public.billboard_documents FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_billboard_documents_billboard ON public.billboard_documents(billboard_id);
CREATE INDEX idx_billboard_documents_type ON public.billboard_documents(document_type);
CREATE UNIQUE INDEX idx_billboard_identifier ON public.billboards_enhanced(billboard_identifier);

-- Function to update total installation cost when installation costs are added/updated
CREATE OR REPLACE FUNCTION update_billboard_total_cost()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.billboards_enhanced 
  SET total_installation_cost = (
    SELECT COALESCE(SUM(amount), 0) 
    FROM public.installation_costs 
    WHERE billboard_id = COALESCE(NEW.billboard_id, OLD.billboard_id)
  )
  WHERE id = COALESCE(NEW.billboard_id, OLD.billboard_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update total installation cost
DROP TRIGGER IF EXISTS trigger_update_billboard_cost ON public.installation_costs;
CREATE TRIGGER trigger_update_billboard_cost
  AFTER INSERT OR UPDATE OR DELETE ON public.installation_costs
  FOR EACH ROW
  EXECUTE FUNCTION update_billboard_total_cost();
