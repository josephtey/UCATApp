UPDATE "Question_Stems"
SET question_order = ${question_order}
WHERE stem_id = ${stem_id}
RETURNING *