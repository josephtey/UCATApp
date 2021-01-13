UPDATE "Sessions"
SET score = ${score}, completed = ${completed}, score_breakdown = ${score_breakdown}
WHERE session_id = ${session_id}
RETURNING *