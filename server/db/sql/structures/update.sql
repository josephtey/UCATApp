UPDATE "Structure"
SET name = ${name}, description = ${description}, type = ${type}, section_order = ${section_order}
WHERE structure_id = ${structure_id}
RETURNING *