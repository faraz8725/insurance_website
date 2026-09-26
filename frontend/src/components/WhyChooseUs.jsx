import "../styles/WhyChooseUs.css";

function WhyChooseUs() {
  const features = [
    {
      number: "01",
      title: "Simple & Transparent",
      text: "No confusing language. Understand your coverage before you choose."
    },
    {
      number: "02",
      title: "Flexible Protection",
      text: "Choose plans and coverage options that fit your needs."
    },
    {
      number: "03",
      title: "Always Here",
      text: "Get support whenever you need help with your policy."
    }
  ];

  return (
    <section className="why-section">
      <div className="why-container">

        <div className="why-left">
          <span className="section-tag">WHY INSUREX</span>

          <h2>
            Insurance without
            <span> the headache.</span>
          </h2>

          <p>
            We believe insurance should be easy to understand,
            easy to manage and there when you need it most.
          </p>

          <div className="why-stat">
            <strong>98%</strong>
            <span>customer satisfaction</span>
          </div>
        </div>

        <div className="features-list">
          {features.map((feature) => (
            <div className="feature-item" key={feature.number}>

              <span className="feature-number">
                {feature.number}
              </span>

              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;