INSERT INTO "Sessions"
  (time, completed, structure_id, current_section_id, current_question_id, session_id, student_id)
VALUES
  (${time}, false, ${structure_id}, ${current_section_id}, ${current_question_id}, ${session_id}, ${student_id})
RETURNING *