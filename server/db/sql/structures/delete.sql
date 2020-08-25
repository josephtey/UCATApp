DELETE FROM "Structure"
WHERE structure_id = ${structure_id}
RETURNING *