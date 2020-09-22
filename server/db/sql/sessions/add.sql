INSERT INTO "Sessions"
  (start_time, end_time, completed, structure_id, student_id)
VALUES
  ('{}', '{}', false, ${structure_id}, ${student_id})
RETURNING *