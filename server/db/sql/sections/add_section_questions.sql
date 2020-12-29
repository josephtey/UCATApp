INSERT INTO "Sections_Questions"
  (section_id, question_id)
VALUES
  (${section_id}, ${question_id})
RETURNING *