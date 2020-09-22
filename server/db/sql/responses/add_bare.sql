INSERT INTO "Responses"
  (flagged, session_id, student_id, question_id, section_id, timestamp)
VALUES
  (${flagged}, ${session_id}, ${student_id}, ${question_id}, ${section_id}, NOW()::timestamp) 
RETURNING *