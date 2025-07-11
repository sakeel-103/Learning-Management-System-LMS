import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api/v1/assessment";

export default function QuizResultPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const QUESTIONS_PER_PAGE = 5;

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const res = await fetch(`${API_BASE}/quizzes/attempts/${attemptId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
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

  const percentage = result.score.toFixed(2);

  // Pagination logic
  const totalPages = Math.ceil(result.feedback.length / QUESTIONS_PER_PAGE);
  const startIdx = (page - 1) * QUESTIONS_PER_PAGE;
  const endIdx = startIdx + QUESTIONS_PER_PAGE;
  const feedbackToShow = result.feedback.slice(startIdx, endIdx);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-2 mt-24">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          {result.is_passed ? (
            <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
          ) : (
            <XCircle className="w-16 h-16 text-red-500 mb-2" />
          )}
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-gray-800">Quiz Results</h2>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-lg shadow">
              Percentage: <span className="font-bold">{percentage}%</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-semibold text-lg shadow">
              Score: <span className="font-bold">{result.correct_answers}/{result.total_questions}</span>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold text-lg shadow ${result.is_passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {result.is_passed ? "Passed 🎉" : "Failed"}
            </div>
          </div>
        </div>
        <hr className="my-8 border-t-2 border-gray-200" />
        <div className="space-y-6">
          {feedbackToShow.map((fb, idx) => (
            <div key={startIdx + idx} className="p-6 bg-gray-50 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold mb-2 text-lg text-gray-800">
                  Q{startIdx + idx + 1}. {fb.question_text}
      </div>
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Your Answer: </span>
                  <span className={fb.is_correct ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {fb.user_answer || "No answer"}
              </span>
            </div>
                <div className="mb-1">
                  <span className="font-medium text-gray-700">Correct Answer: </span>
                  <span className="text-green-700 font-semibold">{fb.correct_answer}</span>
                </div>
              </div>
              <div className="flex flex-col items-center min-w-[100px]">
              {fb.is_correct ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-base">
                    <CheckCircle className="w-5 h-5" /> Correct
                  </span>
              ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-base">
                    <XCircle className="w-5 h-5" /> Incorrect
                  </span>
              )}
            </div>
          </div>
        ))}
      </div>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="font-semibold text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      <button
          className="mt-10 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow transition"
        onClick={() => navigate("/courses/AssesmentPage")}
      >
        Back to Assessments
      </button>
      </div>
    </div>
  );
}
