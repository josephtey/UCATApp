INSERT INTO "Sections"
  (name, description, question_order, time)
VALUES
  (${name}, ${description}, ${question_order}, ${time}) 
RETURNING *