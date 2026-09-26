/*import { Link } from "react-router-dom";
import "../styles/Products.css";

function Products() {
  const products = [
    {
      icon: "🏥",
      title: "Health Insurance",
      description:
        "Get financial protection against unexpected medical expenses."
    },
    {
      icon: "❤️",
      title: "Life Insurance",
      description:
        "Help secure your family's financial future with flexible protection."
    },
    {
      icon: "🚗",
      title: "Car Insurance",
      description:
        "Protect your vehicle from accidents, damage and unexpected costs."
    },
    {
      icon: "🏠",
      title: "Home Insurance",
      description:
        "Protect your home and valuable belongings from covered risks."
    },
    {
      icon: "✈️",
      title: "Travel Insurance",
      description:
        "Travel with confidence knowing you're protected on your journey."
    },
    {
      icon: "💼",
      title: "Business Insurance",
      description:
        "Protect your business against unexpected events and liabilities."
    }
  ];

  return (
    <section className="products-section">
      <div className="section-container">

        <div className="section-heading">
          <div>
            <span className="section-tag">OUR PRODUCTS</span>

            <h2>
              Coverage for every
              <span> chapter of life.</span>
            </h2>
          </div>

          <p>
            Choose the protection that fits your life today
            and helps prepare you for tomorrow.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <Link
              to="/products"
              className="product-card"
              key={index}
            >
              <div className="product-icon">
                {product.icon}
              </div>

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <span className="product-link">
                Explore coverage →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products; */



import { Link } from "react-router-dom";
import "../styles/Products.css";

function Products() {
  const products = [
    {
      icon: "🏥",
      title: "Health Insurance",
      description:
        "Get financial protection against unexpected medical expenses.",
      link: "/insurance/health",
    },
    {
      icon: "❤️",
      title: "Life Insurance",
      description:
        "Help secure your family's financial future with flexible protection.",
      link: "/insurance/life",
    },
    {
      icon: "🚗",
      title: "Car Insurance",
      description:
        "Protect your vehicle from accidents, damage and unexpected costs.",
      link: "/insurance/car",
    },
    {
      icon: "🏠",
      title: "Home Insurance",
      description:
        "Protect your home and valuable belongings from covered risks.",
      link: "/insurance/home",
    },
    {
      icon: "✈️",
      title: "Travel Insurance",
      description:
        "Travel with confidence knowing you're protected on your journey.",
      link: "/insurance/travel",
    },
    {
      icon: "💼",
      title: "Business Insurance",
      description:
        "Protect your business against unexpected events and liabilities.",
      link: "/insurance/business",
    },
  ];

  return (
    <section className="products-section">
      <div className="section-container">

        <div className="section-heading">
          <div>
            <span className="section-tag">OUR PRODUCTS</span>

            <h2>
              Coverage for every
              <span> chapter of life.</span>
            </h2>
          </div>

          <p>
            Choose the protection that fits your life today
            and helps prepare you for tomorrow.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <Link
              to={product.link}
              className="product-card"
              key={index}
            >
              <div className="product-icon">
                {product.icon}
              </div>

              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <span className="product-link">
                Explore coverage →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Products;