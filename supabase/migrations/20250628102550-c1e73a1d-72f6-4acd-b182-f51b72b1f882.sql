
-- Fix foreign key relationships for proper data submission
ALTER TABLE billboards_enhanced 
ADD CONSTRAINT fk_billboards_land_owner 
FOREIGN KEY (land_owner_id) REFERENCES land_owners(id);

ALTER TABLE billboard_rentals 
ADD CONSTRAINT fk_rentals_billboard 
FOREIGN KEY (billboard_id) REFERENCES billboards_enhanced(id);

ALTER TABLE billboard_rentals 
ADD CONSTRAINT fk_rentals_client 
FOREIGN KEY (client_id) REFERENCES clients_enhanced(id);

ALTER TABLE installation_costs 
ADD CONSTRAINT fk_installation_billboard 
FOREIGN KEY (billboard_id) REFERENCES billboards_enhanced(id);

ALTER TABLE installation_costs 
ADD CONSTRAINT fk_installation_partner 
FOREIGN KEY (partner_id) REFERENCES partners(id);

ALTER TABLE partner_investments 
ADD CONSTRAINT fk_partner_investments_billboard 
FOREIGN KEY (billboard_id) REFERENCES billboards_enhanced(id);

ALTER TABLE partner_investments 
ADD CONSTRAINT fk_partner_investments_partner 
FOREIGN KEY (partner_id) REFERENCES partners(id);

ALTER TABLE land_owner_payments 
ADD CONSTRAINT fk_land_owner_payments_billboard 
FOREIGN KEY (billboard_id) REFERENCES billboards_enhanced(id);

ALTER TABLE land_owner_payments 
ADD CONSTRAINT fk_land_owner_payments_owner 
FOREIGN KEY (land_owner_id) REFERENCES land_owners(id);

ALTER TABLE client_payments 
ADD CONSTRAINT fk_client_payments_rental 
FOREIGN KEY (rental_id) REFERENCES billboard_rentals(id);

-- Add missing columns for proper functionality
ALTER TABLE billboard_rentals 
ADD COLUMN IF NOT EXISTS payment_structure TEXT DEFAULT 'equal';

ALTER TABLE billboard_rentals 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create storage bucket for documents if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for document uploads
CREATE POLICY "Allow public uploads to documents bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow public access to documents" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'documents');

-- Create money receipt sequence for unique IDs
CREATE SEQUENCE IF NOT EXISTS money_receipt_seq START 1;

-- Add money receipt ID column to client_payments
ALTER TABLE client_payments 
ADD COLUMN IF NOT EXISTS receipt_id TEXT DEFAULT 'MR-' || LPAD(nextval('money_receipt_seq')::TEXT, 6, '0');
