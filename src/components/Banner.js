import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Frontend Developer" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
    <Container>
      <Row className="">
        <Col xs={12} md={6} xl={7}>
          <TrackVisibility>
            {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
               
                <h1 className="">{`Hi! I'm Bruna `} <br></br>
                  <span className="txt-rotate" dataPeriod="1000" data-rotate='["Frontend Developer"]'>
                    <span className="wrap">{text}</span>
                  </span>
                </h1>

                <p className="">
                I'm a student of Information Systems and Computer Science with a passion for front-end development. I enjoy blending my expertise in design and programming to craft immersive user experiences.
                </p>

                <button onClick={() => console.log('connect')}>
                  My GitHub <a href="https://www.github.com/brunarcedro" target="_blank" rel="noopener noreferrer"><ArrowRightCircle size={25} color="white"/></a>
              </button>
              
              </div>}
          </TrackVisibility>
        </Col>
      </Row>
    </Container>
  </section>
  

  
  
  )
}