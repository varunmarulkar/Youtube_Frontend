import React, { useEffect, useState } from 'react';

const Commentscontainer = ({ videoId }) => {
    const [input, setInput] = useState("");
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editText, setEditText] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Fetch comments whenever videoId changes
    useEffect(() => {
        if (videoId) fetchComments();
    }, [videoId]);


    // Fetch all comments for the current video
    async function fetchComments() {
        try {
            const res = await fetch(`http://localhost:8000/comments/${videoId}`);
            const data = await res.json();
            setComments(data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        }
    }

    // Handle new comment submission
    async function handleSubmit(e) {
        e.preventDefault();
        if (input.trim() === "") return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:8000/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${token}`
                },
                body: JSON.stringify({
                    text: input,
                    videoId,
                    userId: currentUser?._id
                })
            });

            const result = await res.json();
            if (res.ok) {
                setComments([result.newComment, ...comments]);
                setInput("");
            } else {
                alert(result.message);
            }

        } catch (error) {
            console.error("Post comment failed", error);
        }
    }

    // Enter edit mode for a comment
    function handleEdit(comment) {
        setEditCommentId(comment._id);
        setEditText(comment.text);
    }

    // Submit edited comment
    async function submitEdit(id) {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8000/comments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`,
                },
                body: JSON.stringify({ text: editText }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            const updatedComments = comments.map((c) =>
                c._id === id ? { ...c, text: editText } : c
            );
            setComments(updatedComments);
            setEditCommentId(null);
            setEditText("");
        } catch (err) {
            alert("Failed to update comment");
        }
    }

    // Delete a comment after confirmation
    async function handleDelete(id) {
        const confirm = window.confirm("Delete this comment?");
        if (!confirm) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:8000/comments/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setComments(comments.filter((c) => c._id !== id));
        } catch (err) {
            alert("Failed to delete comment");
        }
    }

    return (
        <div className='ml-8 mt-5'>
            <h1 className='font-bold text-2xl'>Comments {comments.length}</h1>

            {/* Input */}
            <div className='flex gap-2 mt-5'>
                <img className='w-10 h-10' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />
                <form onSubmit={handleSubmit} className='flex-1'>
                    <input
                        className='border-b w-full p-1 focus:outline-none'
                        value={input}
                        type="text"
                        placeholder='Add a comment...'
                        onChange={(e) => setInput(e.target.value)}
                    />
                </form>
            </div>

            {/* Comment List */}
            <ul className='mt-6 space-y-4'>
                {comments.map((comment) => (
                    <li key={comment._id} className='flex gap-3'>
                        <img className='w-10 h-10' src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="user" />

                        <div className='flex flex-col w-full'>
                            {/* Username + Edit/Delete */}
                            <div className='flex items-center gap-2'>
                                <span className='font-bold'>{comment.userId?.username || "User"}</span>

                                {currentUser?._id === comment.userId?._id && (
                                    <>
                                        <button onClick={() => handleEdit(comment)} className="text-sm text-blue-500">Edit</button>
                                        <button onClick={() => handleDelete(comment._id)} className="text-sm text-red-500">Delete</button>
                                    </>
                                )}
                            </div>

                            {/* Comment Text or Input  */}
                            {editCommentId === comment._id ? (
                                <div className='flex gap-2 mt-1'>
                                    <input
                                        type="text"
                                        className="border px-2 py-1 text-sm w-full"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={() => submitEdit(comment._id)} className="bg-blue-500 text-white px-2 text-sm rounded">Save</button>
                                    <button onClick={() => setEditCommentId(null)} className="text-sm text-gray-500">Cancel</button>
                                </div>
                            ) : (
                                <p className='text-sm mt-1'>{comment.text}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Commentscontainer;
