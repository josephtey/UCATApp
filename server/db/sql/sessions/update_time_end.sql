UPDATE "Sessions"
SET end_time = end_time || NOW()::timestamp
WHERE session_id = ${session_id}
RETURNING *