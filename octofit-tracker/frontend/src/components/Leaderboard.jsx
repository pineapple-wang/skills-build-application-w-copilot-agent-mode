import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
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

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {items.map((entry, index) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || index}>
              <div>
                <strong>{entry.name || entry.userName || `Player ${index + 1}`}</strong>
                <div className="text-muted">{entry.team || entry.category || 'Overall'}</div>
              </div>
              <span className="badge bg-success">{entry.score || entry.points || 0}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
