INSERT INTO "Responses"
  (value, flagged, committed, session_id, student_id, question_id, section_id, timestamp)
VALUES
  (${value}, false, false, ${session_id}, ${student_id}, ${question_id}, ${section_id}, NOW()::timestamp) 
RETURNING *