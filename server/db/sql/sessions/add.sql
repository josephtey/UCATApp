INSERT INTO "Sessions"
  (time, completed, structure_id, student_id)
VALUES
  ('{}', false, ${structure_id}, ${student_id})
RETURNING *