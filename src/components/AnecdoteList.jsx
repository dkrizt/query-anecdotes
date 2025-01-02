import { useMutation, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  // Mutation for voting
  const voteMutation = useMutation({
    mutationFn: (updatedAnecdote) =>
      anecdotesService.update(updatedAnecdote.id, updatedAnecdote),
    onSuccess: (updatedAnecdote) => {
      // Refresh anecdotes list
      queryClient.invalidateQueries(["anecdotes"]);

      // Display success notification
      dispatch({
        type: "SET",
        payload: `You voted for "${updatedAnecdote.content}"`,
      });

      // Clear notification after 5 seconds
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
    onError: () => {
      // Display error notification
      dispatch({
        type: "SET",
        payload: "Error: Could not register your vote. Please try again!",
      });

      // Clear notification after 5 seconds
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
  });

  // Handle voting
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(updatedAnecdote);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
