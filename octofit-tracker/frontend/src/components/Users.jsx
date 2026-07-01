import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api';

function Users() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
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

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {items.map((user) => (
            <div className="col" key={user._id || user.id || user.email}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{user.name}</h3>
                  <p className="mb-1">{user.email}</p>
                  <p className="mb-1">Goal: {user.fitnessGoal}</p>
                  <p className="mb-0 text-muted">{user.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
