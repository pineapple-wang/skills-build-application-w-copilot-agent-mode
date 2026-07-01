import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
        <p className="lead text-muted mb-4">
          A modern multi-tier fitness application for teams, activity logging,
          and performance insights.
        </p>
        <p className="text-muted mb-4">
          Configure <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces URLs.
          If it is unset, the app falls back to <strong>http://localhost:8000</strong>.
        </p>
        <div className="d-flex flex-wrap gap-3">
          <span className="badge bg-primary-subtle text-primary-emphasis">React 19</span>
          <span className="badge bg-success-subtle text-success-emphasis">Vite</span>
          <span className="badge bg-info-subtle text-info-emphasis">Express + TypeScript</span>
          <span className="badge bg-warning-subtle text-warning-emphasis">MongoDB + Mongoose</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm border-0 sticky-top">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Navigation</h2>
              <nav className="nav flex-column gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
