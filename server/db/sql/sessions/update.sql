UPDATE "Sessions"
SET score = ${score}, completed = ${completed}, current_section_id = ${current_section_id}, current_question_id = ${current_question_id}, time = ${time}
WHERE session_id = ${session_id}
RETURNING *