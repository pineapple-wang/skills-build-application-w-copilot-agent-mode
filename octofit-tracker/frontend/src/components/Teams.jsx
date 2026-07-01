import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Teams() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
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

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {items.map((team) => (
            <div className="col" key={team._id || team.id || team.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{team.name}</h3>
                  <p className="mb-1">{team.description || 'Team overview'}</p>
                  <p className="mb-0 text-muted">Members: {team.memberCount || team.members?.length || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
