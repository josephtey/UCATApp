INSERT INTO "Sessions"
  (time, completed, structure_id, student_id)
VALUES
  (${time}, false, ${structure_id}, ${student_id})
RETURNING *