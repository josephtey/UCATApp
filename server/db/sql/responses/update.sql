UPDATE "Responses"
SET value = ${value}, flagged = ${flagged}, committed = ${committed}, correct=${correct}
WHERE response_id = ${response_id}
RETURNING *