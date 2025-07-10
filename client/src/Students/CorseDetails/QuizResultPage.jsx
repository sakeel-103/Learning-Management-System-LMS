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
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-8 px-2 mt-24">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center mb-8">
          {result.is_passed ? (
            <CheckCircle className="w-16 h-16 text-blue-600 mb-2" />
          ) : (
            <XCircle className="w-16 h-16 text-blue-600 mb-2" />
          )}
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight text-blue-700">Quiz Results</h2>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md font-semibold text-base shadow-sm">
              Percentage: <span className="font-bold">{percentage}%</span>
            </div>
            <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md font-semibold text-base shadow-sm">
              Score: <span className="font-bold">{result.correct_answers}/{result.total_questions}</span>
            </div>
            <div className="bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md font-semibold text-base shadow-sm">
              {result.is_passed ? "Passed 🎉" : "Failed ↻"}
            </div>
          </div>
        </div>
        <hr className="my-8 border-t-2 border-blue-200" />
        <div className="space-y-6">
          {feedbackToShow.map((fb, idx) => (
            <div key={startIdx + idx} className="p-4 bg-blue-50 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1">
                <div className="font-semibold mb-2 text-lg text-blue-700">
                  Q{startIdx + idx + 1}. {fb.question_text}
                </div>
                <div className="mb-1">
                  <span className="font-medium text-blue-600">Your Answer: </span>
                  <span className={fb.is_correct ? "text-blue-600 font-semibold" : "text-blue-600 font-semibold"}>
                    {fb.user_answer || "No answer"}
                  </span>
                </div>
                <div className="mb-1">
                  <span className="font-medium text-blue-600">Correct Answer: </span>
                  <span className="text-blue-600 font-semibold">{fb.correct_answer}</span>
                </div>
              </div>
              <div className="flex flex-col items-center min-w-[100px]">
                {fb.is_correct ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md font-medium text-sm">
                    <CheckCircle className="w-4 h-4" /> Correct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md font-medium text-sm">
                    <XCircle className="w-4 h-4" /> Incorrect
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md disabled:opacity-50 font-medium"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="font-semibold text-base">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md disabled:opacity-50 font-medium"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
        <button
          className="mt-8 w-full px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold text-base shadow-sm transition"
          onClick={() => navigate("/courses/AssesmentPage")}
        >
          Back to Assessments
        </button>
      </div>
    </div>
  );
}
