SELECT A.stem_id, B.question_order FROM "Responses" A 
INNER JOIN "Question_Stems" B ON A.stem_id = B.stem_id
WHERE category_id = ${category_id} AND student_id = ${student_id} AND type = 'Bank'