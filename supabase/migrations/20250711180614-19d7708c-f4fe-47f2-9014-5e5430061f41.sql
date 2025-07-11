-- Add some sample data to get the system working
INSERT INTO billboards_enhanced (location, size, type, status) VALUES
('Dhanmondi 27, Dhaka', '20x10 ft', 'Unipole', 'Available'),
('Gulshan 2, Dhaka', '15x8 ft', 'Unipole', 'Available'),
('Uttara Sector 7, Dhaka', '25x12 ft', 'Unipole', 'Available');

-- Add some sample clients  
INSERT INTO clients_enhanced (company_name, contact_person, contact_email) VALUES
('ABC Corporation', 'John Doe', 'john@abc.com'),
('XYZ Limited', 'Jane Smith', 'jane@xyz.com'),
('Tech Solutions BD', 'Ahmed Rahman', 'ahmed@techsolutions.com');

-- Add some sample land owners
INSERT INTO land_owners (name, contact_person, phone, email) VALUES
('Mohammad Ali', 'Mohammad Ali', '+8801711111111', 'ali@email.com'),
('Fatima Begum', 'Fatima Begum', '+8801722222222', 'fatima@email.com'),
('Karim Ahmed', 'Karim Ahmed', '+8801733333333', 'karim@email.com');

-- Add some sample partners
INSERT INTO partners (name, contact_person, phone, email) VALUES
('Digital Media Partners', 'Rashid Khan', '+8801744444444', 'rashid@dmp.com'),
('Outdoor Advertising Co', 'Nasir Uddin', '+8801755555555', 'nasir@oac.com'),
('Creative Solutions Ltd', 'Sakib Hassan', '+8801766666666', 'sakib@csl.com');