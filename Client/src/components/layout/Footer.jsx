import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="information">
        <section className="about">
          <h3>Om Oss</h3>
          <p>
            Vi är två tjejer som har utbildat oss till fullstack webbutvecklare på Chas Academys 2-åriga fullstack-utbildning.
            Detta är det sista momentet i vår utbildning, vårt examensarbete. 
            Vi har valt att använda oss av React och Redux i frontenden och Node.js med express.js i backenden. Vi har valt mongoDB som databas och heroku för deploy.
          </p>
        </section>

        <section className="contact">
          <h3>Kontakt</h3>
          
          <h4>Astrid</h4>         
          <div>
  
          <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fastridsinabian%3Ffbclid%3DIwAR3pg0mL3Ewz2sBUOvM9iVqJmckqkr1Lc83g53fv_-Q7PwUY04LwR_yC-RM&h=AT1xD0u3AQssEDDG2Giqbk-9HIODJ9abIv2436FkQ4mLTSNIi8uP8J7TFEKEld0AJt-ts_bF3Evkf7wiyEXHjlSh_yl5RTowloZJ2_GuRiAtS6AFUxQA5T_sc2qZA5K7WDVWeyqu" target="_blank" rel="noopener noreferrer"
              className="icon icon-linkedin"
            > </a>
            <a href="mailto:a.sinabian@gmail.com"
              className="icon icon-email"
            > </a>
        
  </div>
  <h4>Diana</h4>
  <div>
  
            <a href="http://www.linkedin.com/in/diana-skshipek-504112177" target="_blank" rel="noopener noreferrer"
              className="icon icon-linkedin" 
            > </a>
            <a href="mailto:Diana.Skshipek@hotmail.com"
              className="icon icon-email"
            > </a>
          </div>
        </section>
      </div>

      <section className="copyright">
        <p className="text">
          © Astrid Sinabian & Diana Skshipek All Rights Reserved
        </p>
      </section>
    </footer>
  );
};

export default Footer;
