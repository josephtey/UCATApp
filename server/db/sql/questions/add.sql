INSERT INTO "Questions"
  (type, options, question, answer, explanation, difficulty, category_id)
VALUES
  (${type}, ${options}, ${question}, ${answer}, ${explanation}, ${difficulty}, ${category_id}) 
RETURNING *