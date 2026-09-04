-- Remove CROPSY from Legend status and correct the recorded Gesher Year.
UPDATE "QuizSubmission"
SET "isLegend" = false, "gesherYear" = 1967
WHERE LOWER("optionalName") = LOWER('CROPSY');
