import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="homepage">
            <div className="hero-section">
                <h1>Welcome to My Meet App</h1>
                <p className="tagline">
                    Organize, manage, and track your items with ease
                </p>
                <p className="description">
                    My Meet App is a serverless, progressive web application that helps you
                    manage your personal items efficiently. Create an account to get started
                    and experience seamless item management across all your devices.
                </p>
            </div>

            <div className="features-section">
                <h2>Key Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>📝 Create Items</h3>
                        <p>Easily add new items to your collection</p>
                    </div>
                    <div className="feature-card">
                        <h3>✏️ Edit Items</h3>
                        <p>Update your items anytime, anywhere</p>
                    </div>
                    <div className="feature-card">
                        <h3>🗑️ Delete Items</h3>
                        <p>Remove items you no longer need</p>
                    </div>
                    <div className="feature-card">
                        <h3>🔒 Secure Access</h3>
                        <p>Your data is protected with authentication</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <h2>Get Started Today</h2>
                <div className="cta-buttons">
                    <Link to="/register" className="btn btn-primary">
                        Create Account
                    </Link>
                    <Link to="/login" className="btn btn-secondary">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
