import { useLocation, useNavigate } from 'react-router-dom';
import './error.css';
import { Link } from 'react-router-dom';

const Error = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const error = location.state?.error || {
        code: 'UNKNOWN',
        title: 'Unexpected Error',
        message: 'Something went wrong.'
    };

    return (
        <section className="error-page">

            <div className="error-card">

                <i className="ri-error-warning-line"></i>

                <h1>{error.title}</h1>

                <p>{error.message}</p>

                <p className="error-code">{error.code}</p>

                <Link replace className='error-button'
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </Link>

            </div>

        </section>
    );
};

export default Error;