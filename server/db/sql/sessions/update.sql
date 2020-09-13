UPDATE "Sessions"
SET score = ${score}, completed = ${completed}
WHERE session_id = ${session_id}
RETURNING *