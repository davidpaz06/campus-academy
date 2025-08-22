import type { FC } from "react";
import "./Footer.css";

const Footer: FC = () => {
  return (
    <footer>
      <div className="footer-columns">
        <div>
          <strong>Products</strong>
          <ul>
            <li>Campus Academy</li>
            <li>Campus Threads</li>
            <li>Campus Schedule</li>
            <li>Campus Metrics</li>
            <li>Campus Data</li>
          </ul>
        </div>
        <div>
          <strong>Company</strong>
          <ul>
            <li>About</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <strong>Social</strong>
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Youtube</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        All rights reserved, Lodestar Solutions. 2025
      </div>
    </footer>
  );
};

export default Footer;
