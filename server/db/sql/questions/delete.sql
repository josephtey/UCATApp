DELETE FROM "Questions"
WHERE question_id = ${question_id}
RETURNING *