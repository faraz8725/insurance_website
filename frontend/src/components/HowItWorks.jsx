import "../styles/HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      icon: "🔍",
      title: "Choose your coverage",
      text: "Explore different insurance options and find the protection you need."
    },
    {
      icon: "📝",
      title: "Get your plan",
      text: "Select a plan that fits your needs and complete your application."
    },
    {
      icon: "🛡️",
      title: "Stay protected",
      text: "Enjoy peace of mind knowing you have protection when it matters."
    }
  ];

  return (
    <section className="how-section">
      <div className="how-container">

        <div className="how-heading">
          <span className="section-tag">HOW IT WORKS</span>

          <h2>
            Protection made
            <span> simple.</span>
          </h2>

          <p>
            Getting covered doesn't need to be complicated.
            We've kept the process simple from start to finish.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>

              <div className="step-top">
                <div className="step-icon">
                  {step.icon}
                </div>

                <span>0{index + 1}</span>
              </div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;