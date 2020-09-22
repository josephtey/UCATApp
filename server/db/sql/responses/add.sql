INSERT INTO "Responses"
  (value, flagged, session_id, student_id, question_id, section_id, timestamp, correct)
VALUES
  (${value}, false, ${session_id}, ${student_id}, ${question_id}, ${section_id}, NOW()::timestamp, ${correct}) 
RETURNING *