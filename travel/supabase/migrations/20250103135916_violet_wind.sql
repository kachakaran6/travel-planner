/*
  # Initial Schema Setup for Travel Planner

  1. New Tables
    - users (managed by Supabase Auth)
    - trips
      - Basic trip information
      - Linked to users
    - itineraries
      - Daily plans within trips
    - expenses
      - Trip expenses tracking
    - packing_items
      - Packing list items for trips
    - accommodations
      - Accommodation details for trips
    - transport
      - Transportation details for trips
    - places
      - Places to visit within trips
    
  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
*/

-- Trips table
CREATE TABLE trips (
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
CREATE TABLE itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  day_date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  amount decimal(10,2) NOT NULL,
  description text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Packing items table
CREATE TABLE packing_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
  item text NOT NULL,
  category text NOT NULL,
  is_packed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Accommodations table
CREATE TABLE accommodations (
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
CREATE TABLE transport (
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
CREATE TABLE places (
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
  ON trips
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their trip itineraries"
  ON itineraries
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = itineraries.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their trip expenses"
  ON expenses
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = expenses.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their packing items"
  ON packing_items
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = packing_items.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their accommodations"
  ON accommodations
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = accommodations.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their transport"
  ON transport
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = transport.trip_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage their places"
  ON places
  USING (EXISTS (
    SELECT 1 FROM trips WHERE trips.id = places.trip_id AND trips.user_id = auth.uid()
  ));

