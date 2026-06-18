import React from 'react';
import '../../styles/terms.css'

const Terms = () => {
    return (
        <>
            <main className="legal-page">
                <div className="legal-container">

                    <h1>Terms & Conditions</h1>

                    <p className="last-updated">
                        Last Updated: June 2026
                    </p>

                    <section className="legal-section">
                        <h2>1. Use of Website</h2>

                        <p>
                            This website is intended to showcase 3D artwork,
                            projects, renders, and professional experience.
                            By using this website, you agree to comply with
                            these terms and conditions.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Intellectual Property</h2>

                        <p>
                            All 3D models, renders, textures, artwork,
                            animations, and project assets displayed on this
                            website remain the intellectual property of the
                            creator unless otherwise stated.
                        </p>

                        <p>
                            Unauthorized reproduction, redistribution,
                            modification, or commercial use is prohibited.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>3. User Accounts</h2>

                        <p>
                            Users are responsible for maintaining the
                            confidentiality of their account credentials and
                            for all activities performed under their account.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Limitation of Liability</h2>

                        <p>
                            The creator shall not be held liable for any
                            damages resulting from the use or inability to use
                            this website.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Contact</h2>

                        <p>
                            For questions regarding these terms, please use
                            the contact page.
                        </p>
                    </section>

                </div>
            </main>
        </>
    )
}

export default Terms
