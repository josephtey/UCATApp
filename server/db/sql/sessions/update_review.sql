UPDATE "Sessions"
SET show_review = ${show}
WHERE session_id = ${session_id}
RETURNING *