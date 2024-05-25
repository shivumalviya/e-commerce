import React from 'react'
import '../css/footer.css'

const Footer = () => {
  return (
   <>
   <footer className="footer" >
  <div className="footer-container">
    <div className="footer-content">
      <h3>About Us</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis
        libero in dui mattis, in faucibus urna tempor.
      </p>
    </div>
    <div className="footer-content">
      <h3>Contact Us</h3>
      <p>
        Email: shivani.malviya@gmail.com
        <br />
        Phone: 7999470337
      </p>
    </div>
    <div className="footer-content">
      <h3>Follow Us</h3>
      <ul className="social-links">
        <li>
          <a href="#">Facebook</a>
        </li>
        <li>
          <a href="#">Twitter</a>
        </li>
        <li>
          <a href="#">Instagram</a>
        </li>
      </ul>
    </div>
  </div>
</footer>

   </>
  )
}

export default Footer