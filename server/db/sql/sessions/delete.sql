DELETE FROM "Sessions"
WHERE session_id = ${session_id}
RETURNING *