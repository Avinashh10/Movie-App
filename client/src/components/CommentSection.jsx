import { useState, useEffect } from "react";

const CommentSection = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://movie-app-1-08bw.onrender.com/comments/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch comments");
        }

        setComments(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  // Add comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setPosting(true);
      setError("");

      const res = await fetch(
        "https://movie-app-1-08bw.onrender.com/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            movieId,
            text: comment,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add comment");
      }

      // Update UI instantly
      setComments((prev) => [data, ...prev]);
      setComment("");
    } catch (err) {
      console.error(err);
      setError("Failed to add comment");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto px-6 pb-12">
      <h2 className="text-2xl font-bold mb-6">User Reviews</h2>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white shrink-0">
          U
        </div>

        <div className="flex-1 min-w-0">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={posting}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500 disabled:opacity-60"
          />

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={posting || !comment.trim()}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {posting ? "Posting…" : "Post"}
            </button>
          </div>
        </div>
      </form>

      {/* Comments */}
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-400 text-center">Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-400 text-center">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="flex gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold shrink-0">
                {c.username ? c.username[0].toUpperCase() : "U"}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">
                    {c.username || "User"} •{" "}
                    {c.createdAt
                      ? new Date(c.createdAt).toLocaleString()
                      : ""}
                  </p>
                  <p className="text-white break-words">{c.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;