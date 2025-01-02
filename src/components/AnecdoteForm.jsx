import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const mutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
      dispatch({ type: "SET", payload: "Anecdote added successfully!" });
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
    onError: (error) => {
      dispatch({ type: "SET", payload: error.response?.data?.error || "Failed to add anecdote" });
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: content.trim(),
      votes: 0,
    };
    mutation.mutate(newAnecdote);
    setContent("");
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input
          name="anecdote"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your anecdote"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
