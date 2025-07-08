import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api/v1/assessment";

export default function DynamicQuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/quizzes/${quizId}/`);
        if (!res.ok) throw new Error("Failed to load quiz");
        const data = await res.json();
        setQuiz(data);
        setTimeLeft(data.time_limit * 60); // time_limit in minutes
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [quizId]);

  // Timer
  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async () => {
    // Check if all questions are answered
    const allAnswered = quiz.questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

    try {
      // Prepare the payload
      const responses = quiz.questions.map(q => ({
        question_id: q.id,
        selected_choice_ids: [answers[q.id]]
      }));

    //   const token = localStorage.getItem("ACCESS_TOKEN");
      const res = await fetch(`${API_BASE}/quizzes/${quizId}/submit_attempt/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quiz_id: quizId,      // <-- Add this line!
          responses
        })
      });
        
       
      

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to submit quiz.");
        return;
      }
      setResult(data); // <-- Show result on the same page!
      navigate(`/AssessmentCourses/result/${data.attempt_id}`);
    } catch (err) {
      alert("Failed to submit quiz.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0) return <div>No questions found.</div>;

  const q = quiz.questions[current];

  return (
    <div className="max-w-xl mx-auto py-20 px-4 mt-12">
      {result ? (
        <div className="mt-8 p-6 bg-gray-100 rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-lg mb-2">
            You scored <span className="font-semibold">{result.score}</span> out of <span className="font-semibold">{result.total_questions}</span>
          </p>
          <p className="mb-2 text-lg">
            Percentage: <span className="font-semibold">{((result.score / result.total_questions) * 100).toFixed(2)}%</span>
          </p>
          <p className={`text-xl font-bold mb-4 ${result.is_passed ? "text-green-600" : "text-red-600"}`}>
            {result.is_passed ? "Congratulations! You Passed 🎉" : "Sorry, You Did Not Pass"}
          </p>
          {result.feedback && (
            <div className="mt-6 text-left">
              <h3 className="text-lg font-bold mb-2">Review:</h3>
              {result.feedback.map((fb, idx) => (
                <div key={idx} className="mb-4 p-4 bg-white rounded shadow">
                  <div className="font-semibold mb-1">Q{idx + 1}. {fb.question_text}</div>
                  <div>
                    <span className="font-medium">Your Answer: </span>
                    <span className={fb.is_correct ? "text-green-600" : "text-red-600"}>
                      {fb.user_answer}
                    </span>
                  </div>
                  {!fb.is_correct && (
                    <div>
                      <span className="font-medium">Correct Answer: </span>
                      <span className="text-green-600">{fb.correct_answer}</span>
                    </div>
                  )}
                  <div>
                    {fb.is_correct ? (
                      <span className="text-green-600 font-bold">Correct</span>
                    ) : (
                      <span className="text-red-600 font-bold">Incorrect</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigate("/courses/AssesmentPage")}
          >
            Back to Assessments
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold">
              Question {current + 1} of {quiz.questions.length}
            </span>
            <span className="text-blue-700 font-semibold">
              Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="mb-6 p-6 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">
              Q{current + 1}. {q.question_text}
            </h3>
            {q.choices.map((c) => (
              <label key={c.id} className="block mb-1 cursor-pointer">
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={c.id}
                  checked={answers[q.id] === c.id}
                  onChange={() => setAnswers({ ...answers, [q.id]: c.id })}
                  className="mr-2"
                />
                {c.choice_text}
              </label>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Previous
            </button>
            {current < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
