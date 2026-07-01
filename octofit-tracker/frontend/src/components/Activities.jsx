import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(getApiUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items || [];
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {items.map((activity) => (
            <div className="list-group-item" key={activity._id || activity.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{activity.type}</strong>
                  <div className="text-muted">{activity.date}</div>
                </div>
                <span className="badge bg-primary">{activity.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
