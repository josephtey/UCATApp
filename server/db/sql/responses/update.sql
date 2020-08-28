UPDATE "Responses"
SET value = ${value}, flagged = ${flagged}, committed = ${committed}
WHERE response_id = ${response_id}
RETURNING *