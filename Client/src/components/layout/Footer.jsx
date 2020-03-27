import React from 'react';

function Footer() {
    return (
        <footer>
          <div className="information">
            <section className="about">
              <h3>Om Oss</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sapien metus, maximus fermentum eros eu, ullamcorper tincidunt orci. Suspendisse luctus faucibus tortor sit amet tincidunt.</p>
            </section>

            <section className="contact">
              <h3>Kontakt</h3>
              <div>
                <a href="www.linkedin.com" className="icon icon-linkedin" target="_blank" rel="noopener noreferrer"></a>
                <a href="mailto:a.sinabian@gmail.com" className="icon icon-email" target="_blank" rel="noopener noreferrer"></a>
              </div>
            </section>
          </div>

          <section className="copyright">
            <p className="text">© Astrid Sinabian & Diana Skshipek All Rights Reserved</p>
          </section>
        </footer>
    );
  }

export default Footer;