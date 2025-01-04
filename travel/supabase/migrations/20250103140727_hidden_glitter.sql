/*
  # Initial Schema Setup

  1. New Tables
    - `trips`: Store trip information
    - `itineraries`: Daily trip activities
    - `expenses`: Trip expenses tracking
    - `packing_items`: Packing list items
    - `accommodations`: Accommodation bookings
    - `transport`: Transportation details
    - `places`: Places to visit

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text,
  start_date date,
  end_date date,
  budget decimal(10,2),
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'ongoing', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  day_date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  amount decimal(10,2) NOT NULL,
  description text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Packing items table
CREATE TABLE IF NOT EXISTS packing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  item text NOT NULL,
  category text NOT NULL,
  is_packed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text,
  check_in timestamptz,
  check_out timestamptz,
  booking_ref text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Transport table
CREATE TABLE IF NOT EXISTS transport (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  departure_location text,
  arrival_location text,
  departure_time timestamptz,
  arrival_time timestamptz,
  booking_ref text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Places table
CREATE TABLE IF NOT EXISTS places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text,
  latitude decimal(10,8),
  longitude decimal(11,8),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own trips"
  ON trips FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their trip itineraries"
  ON itineraries FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = itineraries.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their trip expenses"
  ON expenses FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = expenses.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their packing items"
  ON packing_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = packing_items.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their accommodations"
  ON accommodations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = accommodations.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their transport"
  ON transport FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = transport.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their places"
  ON places FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = places.trip_id AND trips.user_id = auth.uid()
  ));