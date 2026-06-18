import React from 'react'
import '../../styles/terms.css'

const Privacy = () => {
    return (
        <>
            <main className="legal-page">
                <div className="legal-container">

                    <h1>Privacy Policy</h1>

                    <p className="last-updated">
                        Last Updated: June 2026
                    </p>

                    <section className="legal-section">
                        <h2>1. Information We Collect</h2>

                        <p>
                            We may collect the following information when you
                            create an account:
                        </p>

                        <ul>
                            <li>Username</li>
                            <li>Email Address</li>
                            <li>Encrypted Password</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. How We Use Information</h2>

                        <p>
                            Collected information is used solely for:
                        </p>

                        <ul>
                            <li>Account creation</li>
                            <li>User authentication</li>
                            <li>Website functionality</li>
                            <li>Security purposes</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. Data Protection</h2>

                        <p>
                            Reasonable security measures are implemented to
                            protect user information from unauthorized access.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Third-Party Services</h2>

                        <p>
                            This website may use third-party services for
                            hosting, analytics, or authentication. These
                            services may process data according to their own
                            privacy policies.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Contact</h2>

                        <p>
                            If you have any questions regarding this privacy
                            policy, please contact us through the contact page.
                        </p>
                    </section>

                </div>
            </main>
        </>
    )
}

export default Privacy
