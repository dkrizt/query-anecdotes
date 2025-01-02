import { useQuery } from '@tanstack/react-query';
import anecdotesService from './services/anecdotes';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = () => {
  const { data: anecdotes = [], isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
  });

  if (isLoading) return <div>Loading anecdotes...</div>;
  if (isError) return <div>Error loading anecdotes!</div>;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
