DELETE FROM "Sections"
WHERE section_id = ${section_id}
RETURNING *