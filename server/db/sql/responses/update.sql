UPDATE "Responses"
SET value = ${value}, correct=${correct}, points=${points}
WHERE response_id = ${response_id}
RETURNING *