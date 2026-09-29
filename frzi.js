
          /* PRODUCTS *
          <div className="nav-dropdown">
            <button
              className="nav-item"
              onClick={() => toggleMenu("products")}
            >
              Products
              <span className="arrow">⌄</span>
            </button>

            {openMenu === "products" && (
              <div className="dropdown-menu">
                <Link to="/products">Health Insurance</Link>
                <Link to="/products">Life Insurance</Link>
                <Link to="/products">Car Insurance</Link>
                <Link to="/products">Home Insurance</Link>
                <Link to="/products">Travel Insurance</Link>
              </div>
            )}
          </div> */ 


          line 153-174


line 100-123

          <Route
                  path="/insurance/life"
                  element={<LifeInsurancePage />}
                />
          
                <Route
                  path="/insurance/car"
                  element={<CarInsurancePage />}
                />
          
                <Route
                  path="/insurance/bike"
                  element={<BikeInsurancePage />}
                />
          
                <Route
                  path="/insurance/home"
                  element={<HomeInsurancePage />}
                />
          
                <Route
                  path="/insurance/travel"
                  element={<TravelInsurancePage />}
                />
          