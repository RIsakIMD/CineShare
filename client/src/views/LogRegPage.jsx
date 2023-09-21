
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import 'bootstrap/dist/css/bootstrap.css';


const LogRegPage = ({ errors, setErrors }) => {
    return (
        <div className="container bg-light mt-5">
            <h1 className="text-center display-1 text-primary rounded mb-4">
                Cine-Share
            </h1>
            <div className="text-danger">
                {errors.map((err, idx) => <p key={idx}>{err}</p>)}
            </div>
            <div className="row justify-content-around">
                <div className="col-md-5 bg-secondary border border-warning p-4 rounded">
                    <RegisterForm errors={errors} setErrors={setErrors} />
                </div>
                <div className="col-md-5 bg-secondary border border-warning p-4 rounded">
                    <LoginForm errors={errors} setErrors={setErrors} />
                </div>
            </div>
        </div>
    )
}

export default LogRegPage;
