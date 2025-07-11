import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
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
  const [attemptId, setAttemptId] = useState(null);

  const navigate = useNavigate();

  // Fetch quiz data
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    const fetchQuiz = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/quizzes/${quizId}/`);
        if (!res.ok) throw new Error("Failed to load quiz");
        const data = await res.json();
        setQuiz(data);

        // Timer logic
        const storedStartTime = localStorage.getItem(`quiz-${quizId}-startTime`);
        const now = Math.floor(Date.now() / 1000);
        let timeLeftInSeconds;
        if (storedStartTime) {
          const elapsed = now - parseInt(storedStartTime);
          timeLeftInSeconds = Math.max(0, data.time_limit * 60 - elapsed);
        } else {
          localStorage.setItem(`quiz-${quizId}-startTime`, now);
          timeLeftInSeconds = data.time_limit * 60;
        }
        setTimeLeft(timeLeftInSeconds);

        // --- Always start a new attempt and set attemptId ---
        const resStart = await fetch(`${API_BASE}/quizzes/${quizId}/start/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        const dataStart = await resStart.json();
        if (!resStart.ok) throw new Error(dataStart.message || "Failed to start attempt");
        setAttemptId(dataStart.attempt_id);

      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [quizId, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async () => {
    const allAnswered = quiz.questions.every(q => answers[q.id]);
    if (!allAnswered) {
      alert("Please answer all questions before submitting the quiz.");
      return;
    }

  const token = localStorage.getItem("ACCESS_TOKEN");

  // ✅ Check if token is expired
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      alert("Session expired. Please log in again.");
      localStorage.clear();
      navigate("/login");  // or your login route
      return;
    }
  } catch (e) {
    alert("Invalid session. Please log in again.");
    localStorage.clear();
    navigate("/login");
    return;
  }

  try {
    const responses = quiz.questions.map((q) => ({
      question_id: q.id,
      selected_choice_ids: [answers[q.id]], // This must be a UUID!
    }));

    console.log("Submitting payload:", {
      quiz_id: quizId,
      attempt_id: attemptId,
      responses,
    });

    const res = await fetch(`${API_BASE}/quizzes/${quizId}/submit_attempt/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quiz_id: quizId,
        attempt_id: attemptId, // always use the current attemptId
        responses,
      }),
    });

    const data = await res.json();
    console.log("Quiz submit response:", data);

    if (!res.ok) {
      alert(data.message || "Failed to submit quiz.");
      return;
    }

    localStorage.removeItem(`quiz-${quizId}-startTime`);
    navigate(`/students/CorseDetails/QuizResultPage/${attemptId}`);
  } catch (err) {
    alert("Error submitting quiz. Check console.");
    console.error(err);
  }
};
  
  
  
// const handleSubmit = async () => {
//   const allAnswered = quiz.questions.every(q => answers[q.id]);
//   if (!allAnswered) {
//     alert("Please answer all questions before submitting the quiz.");
//     return;
//   }

//   try {
//     const responses = quiz.questions.map(q => ({
//       question_id: q.id,
//       selected_choice_ids: [answers[q.id]]
//     }));

//     const res = await fetch(`${API_BASE}/quizzes/${quizId}/submit_attempt/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         quiz_id: quizId,
//         responses,
//       }),
//     });
       
//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.message || "Failed to submit quiz.");
//       return;
//     }

//     // Clear timer
//     localStorage.removeItem(`quiz-${quizId}-startTime`);

//     // Navigate to result page
//     navigate(`/students/CorseDetails/QuizResultPage/${data.attempt_id}`);
//   } catch (err) {
//     alert("Error submitting quiz. Please try again.");
//   }
// };
  // const handleSubmit = async () => {
  //   const allAnswered = quiz.questions.every((q) => answers[q.id]);
  //   if (!allAnswered) {
  //     alert("Please answer all questions before submitting the quiz.");
  //     return;
  //   }

  //   alert("Quiz submitted!");
  //   localStorage.removeItem(`quiz-${quizId}-startTime`); // Clear persisted timer
  //   navigate("/courses/AssesmentPage");

    // --- Optional: Enable this if you're submitting to the backend ---
    /*
    try {
      const responses = quiz.questions.map((q) => ({
        question_id: q.id,
        selected_choice_ids: [answers[q.id]],
      }));

      const res = await fetch(`${API_BASE}/quizzes/${quizId}/submit_attempt/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quiz_id: quizId,
          responses,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to submit quiz.");
        return;
      }
      setResult(data);
      navigate(`/students/CorseDetails/QuizResultPage/${data.attempt_id}`);
    } catch (err) {
      alert("Failed to submit quiz.");
    }
    */
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0)
    return <div>No questions found.</div>;

  const q = quiz.questions[current];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-gray-700">
              Question {current + 1} of {quiz.questions.length}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold">
              Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${((current + 1) / quiz.questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl shadow flex flex-col gap-4">
          <h3 className="font-bold text-xl text-gray-800 mb-2">
            Q{current + 1}. {quiz.questions[current].question_text}
            </h3>
          <div className="space-y-3">
            {quiz.questions[current].choices.map((c) => (
              <label
                key={c.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all
                  ${
                    answers[quiz.questions[current].id] === c.id
                      ? "bg-blue-100 border-blue-400"
                      : "bg-white border-gray-300 hover:border-blue-300"
                  }
                `}
              >
                <input
                  type="radio"
                  name={`q${quiz.questions[current].id}`}
                  value={c.id}
                  checked={answers[quiz.questions[current].id] === c.id}
                  onChange={() =>
                    setAnswers({ ...answers, [quiz.questions[current].id]: c.id })
                  }
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{c.choice_text}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow disabled:opacity-50"
            >
              Previous
            </button>
            {current < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrent((c) => c + 1)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow"
              >
                Submit Quiz
              </button>
            )}
          </div>
      </div>
    </div>
  );
}









