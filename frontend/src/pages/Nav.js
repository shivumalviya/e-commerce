import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    let storage = localStorage.clear()
    if (storage) {
      navigate("/signup")
    } else {
      alert("DO YOU WANT TO LOGOUT.....")
    }

  }
  return (
    <>
      <nav className="navbar  navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">

          <a className="navbar-brand" href="#">
            <img
              src="https://i.pinimg.com/736x/09/0f/55/090f5516b8b09acf34fd4d55517c2e24.jpg"
              alt="Avatar Logo"
              style={{ width: 55 }}
              className="rounded-pill"
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>


          <div className="collapse navbar-collapse" id="navbarText">


            {auth ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update/:id">
                  Update Product
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item"> <Link onClick={logout} className="nav-link" to="/signup">
                Logout  <span style={{color:"#0f3f8c"}} >({JSON.parse(auth).name})</span>
              </Link>
              </li>
            </ul>
              :
              <ul className="navbar-nav ms-auto p-2">
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </ul>
            }
          </div>
        </div>

      </nav>

    </>
  )
}

export default Nav