SELECT * FROM "Sessions"
WHERE structure_id = ${structure_id} AND student_id = ${student_id}
ORDER BY start_time DESC