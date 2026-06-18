import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './loading.css'

const Loading = ({
    title = "Loading",
    message = "Please wait"
}) => {

    const [dots, setDots] = useState('.');

    useEffect(() => {
        const frames = ['.', '..', '...'];
        let index = 0;

        const interval = setInterval(() => {
            setDots(frames[index]);
            index = (index + 1) % frames.length;
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="loading-page">
            <div className="loader"></div>

            <h2>{title}{dots}</h2>

            <p>{message}{dots}</p>
        </section>
    );
};

export default Loading;