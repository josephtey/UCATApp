UPDATE "Sessions"
SET time = time || NOW()::timestamp
WHERE session_id = ${session_id}
RETURNING *