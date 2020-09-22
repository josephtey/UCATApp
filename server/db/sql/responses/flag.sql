UPDATE "Responses"
SET flagged = ${flagged}
WHERE response_id = ${response_id}
RETURNING *