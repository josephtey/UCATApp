UPDATE "Responses"
SET value = ${value}, correct=${correct}
WHERE response_id = ${response_id}
RETURNING *