/*
  # Create macro calculations table

  1. New Tables
    - `macro_calculations`
      - `id` (uuid, primary key)
      - `name` (text) - User's name
      - `email` (text) - User's email
      - `age` (integer) - User's age in years
      - `gender` (text) - User's gender (male/female)
      - `weight` (numeric) - User's weight in kg
      - `height` (numeric) - User's height in cm
      - `activity_level` (text) - Activity level (sedentary/light/moderate/active/very_active)
      - `goal` (text) - Fitness goal (lose/maintain/gain)
      - `bmr` (numeric) - Calculated Basal Metabolic Rate
      - `tdee` (numeric) - Total Daily Energy Expenditure
      - `target_calories` (numeric) - Target calories based on goal
      - `protein` (numeric) - Protein in grams
      - `carbs` (numeric) - Carbohydrates in grams
      - `fats` (numeric) - Fats in grams
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `macro_calculations` table
    - Add policy for public to insert their own calculations
*/

CREATE TABLE IF NOT EXISTS macro_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL,
  weight numeric NOT NULL,
  height numeric NOT NULL,
  activity_level text NOT NULL,
  goal text NOT NULL,
  bmr numeric NOT NULL,
  tdee numeric NOT NULL,
  target_calories numeric NOT NULL,
  protein numeric NOT NULL,
  carbs numeric NOT NULL,
  fats numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE macro_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert macro calculations"
  ON macro_calculations
  FOR INSERT
  TO anon
  WITH CHECK (true);