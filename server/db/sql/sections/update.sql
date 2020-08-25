UPDATE "Sections"
SET name = ${name}, description = ${description}, question_order = ${question_order}
WHERE section_id = ${section_id}
RETURNING *