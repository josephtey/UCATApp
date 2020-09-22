UPDATE "Sessions"
SET start_time = start_time || NOW()::timestamp
WHERE session_id = ${session_id}
RETURNING *