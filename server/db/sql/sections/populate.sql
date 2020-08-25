UPDATE "Sections" 
SET question_order = question_order || ${question_id}
WHERE section_id = ${section_id};

INSERT INTO "Sections_Questions" (section_id, question_id)
VALUES (${section_id}, ${question_id})
RETURNING *
