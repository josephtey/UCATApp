INSERT INTO "Question_Stems"
  (text, question_order, image, category_id, type)
VALUES
  (${text}, ${question_order}, ${image}, ${category_id}, ${type}) 
RETURNING *