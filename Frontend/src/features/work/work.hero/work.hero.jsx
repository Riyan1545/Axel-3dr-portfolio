import './work.hero.css';

const WorkHero = ({
    activeCategory,
    setActiveCategory
}) => {

    const categories = [
        'ALL',
        'Character',
        'Environment',
        'Creature',
        'Prop',
        'Vehicle',
        'Architecture',
        'Weapon',
        'Other'
    ];
    return (
        <div>
            <section className="work-hero">
                <div className="work-container">

                    <div className="work-content">

                        <span className="work-tag">
                            MY WORK
                        </span>

                        <h1>
                            Selected
                            <span> Projects</span>
                        </h1>

                        <p>
                            A collection of selected works that showcase my passion for detail and quality.
                        </p>

                        <div className="btn-container">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={
                                        activeCategory === category
                                            ? "work-btn btn-active"
                                            : "work-btn"
                                    }
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default WorkHero
