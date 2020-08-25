INSERT INTO "Sections"
  (name, description, question_order)
VALUES
  (${name}, ${description}, ${question_order}) 
RETURNING *