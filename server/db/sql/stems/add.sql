INSERT INTO "Question_Stems"
  (text, question_order, image)
VALUES
  (${text}, ${question_order}, ${image}) 
RETURNING *