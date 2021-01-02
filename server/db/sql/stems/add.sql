INSERT INTO "Question_Stems"
  (text, question_order, image, category_id, type, layout)
VALUES
  (${text}, ${question_order}, ${image}, ${category_id}, ${type}, ${layout}) 
RETURNING *