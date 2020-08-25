UPDATE "Questions"
SET name = ${type}, options = ${options}, question = ${question}, answer = ${answer}, explanation = ${explanation}, difficulty = ${difficulty}, category_id = ${category_id}
WHERE question_id = ${question_id}
RETURNING *