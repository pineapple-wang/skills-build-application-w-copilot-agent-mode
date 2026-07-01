import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || [];
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {items.map((workout) => (
            <div className="list-group-item" key={workout._id || workout.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{workout.title || workout.name || 'Workout'}</strong>
                  <div className="text-muted">{workout.focus || workout.description || 'Suggested plan'}</div>
                </div>
                <span className="badge bg-info">{workout.duration || workout.length || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
