import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000/api/v1/assessment";

export default function QuizResultPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError("");
      try {
        // const token = localStorage.getItem("ACCESS_TOKEN");
        const res = await fetch(`${API_BASE}/quizzes/attempts/${attemptId}/`)
        //   headers: token ? { "Authorization": `Bearer ${token}` } : {}
      
        if (!res.ok) throw new Error("Failed to fetch result");
        const data = await res.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchResult();
  }, [attemptId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!result) return <div>No result found.</div>;

  const percentage = ((result.score / result.total_questions) * 100).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6 p-6 bg-gray-100 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="mb-2 text-lg">
          Score: <span className="font-semibold">{result.score}</span> / <span className="font-semibold">{result.total_questions}</span>
        </p>
        <p className="mb-2 text-lg">
          Percentage: <span className="font-semibold">{percentage}%</span>
        </p>
        <p className={`text-xl font-bold mb-4 ${result.is_passed ? "text-green-600" : "text-red-600"}`}>
          {result.is_passed ? "Passed 🎉" : "Failed"}
        </p>
      </div>
      <div className="mt-6">
        {result.feedback && result.feedback.map((fb, idx) => (
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
      <button
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate("/courses/AssesmentPage")}
      >
        Back to Assessments
      </button>
    </div>
  );
}
