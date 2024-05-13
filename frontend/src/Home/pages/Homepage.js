import '../CSS/Homepage.css';
import audio6 from '../../assets/audio1.wav';
import audio2 from '../../assets/audio2.wav';
import audio4 from '../../assets/audio4.wav';
import audio3 from '../../assets/audio3.wav';
import audio5 from '../../assets/audio5.wav';
import audio1 from '../../assets/audio6.wav';
import background from '../../assets/background-2.webp';
import Benefits1 from '../../assets/benefits1.png';
import Benefits2 from '../../assets/benefits2.png';
import Benefits3 from '../../assets/benefits3.png';
import chinese from '../../assets/china.png';
import England from '../../assets/england.png';
import gif1 from '../../assets/gif1.gif';
import { useEffect, useRef, useState } from 'react';
import activep from '../../assets/activep.svg';
import german from '../../assets/german.png';
import hindi from '../../assets/hindi.webp';
import how1 from '../../assets/how1.jpg';
import how2 from '../../assets/how2.jpg';
import how3 from '../../assets/how3.jpg';
import Japanese from '../../assets/japanese.png';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import p5 from '../../assets/p5.png';
import p6 from '../../assets/p6.png';
import PK from '../../assets/pk.svg';
import Portugeese from '../../assets/portugeese.png';
import rocket from '../../assets/rocket.png';
import spanish from '../../assets/spanish.png';
import tube from '../../assets/tube.png';
import UK from '../../assets/uk.jpeg';
import uppercloud from '../../assets/upercloud.png';
import USA from '../../assets/usa.webp';
import TryButton from '../components/TryButton';

const Homepage = () => {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const prevSelectedPersonRef = useRef(null);
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(false);

  
  useEffect(() => {
    if (prevSelectedPersonRef.current !== null) {
      const prevElement = document.getElementById(
        `p${prevSelectedPersonRef.current}`,
      );
      if (prevElement) {
        prevElement.classList.remove('selected_person');
      }
    }

    const currentElement = document.getElementById(`p${selectedPerson}`);
    if (currentElement) {
      currentElement.classList.add('selected_person');
    }

    prevSelectedPersonRef.current = selectedPerson;

    if (selectedPerson !== 0) {
      const audioFiles = {
        1: audio1,
        5: audio4,
        2: audio6,
        4: audio3,
        3: audio5,
        6: audio2,
      };

      const audioFile = audioFiles[selectedPerson];
      const audio = new Audio(audioFile);

      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }

      audio.play();
      setMusicOn(true);
      audioRef.current = audio;
    } else {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setMusicOn(false);
      }
    }
  }, [selectedPerson]);
  return (
    <>
      <div className="homepage">
        {/* Hero Section */}
        <div className="hero__section">
          <div className="hero__header">
            <h1>The Future of AI Dubbing, Voice Cloning with Emotion Recognization</h1>
            <p>Press Play to Explore: Try Our AI Dubbing Voices in Action!</p>
          </div>
          <div className="hero__persons">
            <div
              className="hero__person"
              id="p1"
              onClick={() => setSelectedPerson(selectedPerson === 1 ? 0 : 1)}
            >
              <img src={p1} alt="" />
              {selectedPerson === 1 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
            <div
              className="hero__person"
              id="p2"
              onClick={() => setSelectedPerson(selectedPerson === 2 ? 0 : 2)}
            >
              <img src={p2} alt="" />
              {selectedPerson === 2 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
            <div
              className="hero__person"
              id="p3"
              onClick={() => setSelectedPerson(selectedPerson === 3 ? 0 : 3)}
            >
              <img src={p3} alt="" />
              {selectedPerson === 3 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
            <div
              className="hero__person"
              id="p4"
              onClick={() => setSelectedPerson(selectedPerson === 4 ? 0 : 4)}
            >
              <img src={p4} alt="" />
              {selectedPerson === 4 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
            <div
              className="hero__person"
              id="p5"
              onClick={() => setSelectedPerson(selectedPerson === 5 ? 0 : 5)}
            >
              <img src={p5} alt="" />

              {selectedPerson === 5 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
            <div
              className="hero__person"
              id="p6"
              onClick={() => setSelectedPerson(selectedPerson === 6 ? 0 : 6)}
            >
              <img src={p6} alt="" />
              {selectedPerson === 6 && (
                <img className="activeImg" src={activep} alt="" />
              )}
            </div>
          </div>
          <div className="hero__music">
            <div className="music__dotted"></div>
            <div
              className={`${
                musicOn === true ? 'd-none' : 'music__outer-circle'
              }`}
            >
              <div className={`music__middle-circle`}>
                <div className={`music__inner-circle`}>
                  <div
                    className="music__play-btn"
                    onClick={() => {
                      setMusicOn(!musicOn);
                      setSelectedPerson(selectedPerson === 0 ? 1 : 0);
                    }}
                  >
                    {musicOn === false ? (
                      <div className="music__play"></div>
                    ) : (
                      <div className="music__pause">
                        <div className="pause__line"></div>
                        <div className="pause__line"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="music__straight"></div>
            {musicOn && <img className="gif" src={gif1} alt="" />}
          </div>
          <TryButton />
        </div>
        {/* Benefits Section */}
        <div className="benefits__section">
          <div className="benefits__card">
            <img src={background} className="benefits__card-bg" alt='Benifit' />
            <div className="benefits__card-wrapper">
              <h1>AI Dubbing & Voiceovers Faster, Profitable & Magical!</h1>
              <div className="benefits__boxes-container">
                <div className="benefits__box">
                  <div className="benefits__box-left">
                    <div className="benefits__icon">
                      <img src={Benefits3} alt="" />
                    </div>
                  </div>
                  <div className="benefits__box-right">
                    <span>10X</span>
                    <span>Watch time of your content</span>
                  </div>
                </div>
                <div className="benefits__box">
                  <div className="benefits__box-left">
                    <div className="benefits__icon">
                      <img src={Benefits2} alt="" />
                    </div>
                  </div>
                  <div className="benefits__box-right">
                    <span>300%</span>
                    <span>Increase in total revenues</span>
                  </div>
                </div>
                <div className="benefits__box">
                  <div className="benefits__box-left">
                    <div className="benefits__icon">
                      <img src={Benefits1} alt="" />
                    </div>
                  </div>
                  <div className="benefits__box-right">
                    <span>80%</span>
                    <span>Timing reduction in video dubbing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="benefits__last-container">
            <h1>Get human-like dubbing with AI Faster, Affordable & Better</h1>
            <TryButton />
          </div>
        </div>
        {/* How it Works Section */}

        <div className="working__section">
          <h1>How it Works</h1>
          <p>
            Create translated content in minutes, not hours, with just a few
            simple steps.
          </p>

          <div className="working__card">
            <div className="working__card-left">
              <div className="working__card-img--sm">
                <img src={uppercloud} alt="" />
              </div>
              <div className="working__card-heading">1. Upload File</div>
              <div className="working__card-steps">
                <ul>
                  <li>
                    Upload your audio/video from your computer or Youtube link.
                  </li>
                  <li>Select the video's original and target languages.</li>
                  <li>
                    You can also upload with SRT/VTT files and use dictionaries
                    for better transcription.
                  </li>
                </ul>
              </div>
            </div>
            <div className="working__card-right">
              <img src={how1} alt="" />
            </div>
          </div>
          <div className="working__card">
            <div className="working__card-left">
              <div className="working__card-img--sm">
                <img src={rocket} alt="" />
              </div>
              <div className="working__card-heading">2. Processing</div>
              <div className="working__card-steps">
                <ul>
                  <li>
                    After clicking submit. Soon, you will have autogenerated
                    captions & translations
                  </li>
                  <li>The process time is based on the length of the video.</li>
                </ul>
              </div>
            </div>
            <div className="working__card-right">
              <img src={how2} alt="" />
            </div>
          </div>
          <div className="working__card">
            <div className="working__card-left">
              <div className="working__card-img--sm">
                <img src={tube} alt="" />
              </div>
              <div className="working__card-heading">3.Edit, dub, Export </div>
              <div className="working__card-steps">
                <ul>
                  <li>
                    After satisfied with the transcription, click “Start
                    Dubbing” with available voiceovers or use the Voice Cloning
                    feature.
                  </li>
                  <li>
                    Soon, you can export your video in formats like MP4, MP3,
                    and SRT.
                  </li>
                  <li>
                    Additionally, you can also edit and redub the video as
                    needed.
                  </li>
                </ul>
              </div>
            </div>
            <div className="working__card-right">
              <img src={how3} alt="" />
            </div>
          </div>
        </div>
        {/* Languages Section */}
        <div className="languages__Section">
          <div className="live__languages">
            <h1>Supported Languages</h1>
            <p>
              Select one of the popular languages we support below to preview a
              sample video.
            </p>
            <div className="languages__options-container">
              <div className="language-box">
                <div className="language-name">English</div>
                <div className="language-nations">
                  <img src={UK} alt="" />
                  <img src={USA} alt="" />
                  <img src={England} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">Urdu</div>
                <div className="language-nations">
                  <img src={PK} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="coming__languages">
            <h1>Coming Soon</h1>
            <div className="languages__options-container">
              <div className="language-box">
                <div className="language-name">Portuguese</div>
                <div className="language-nations-soon">
                  <img src={Portugeese} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">German</div>
                <div className="language-nations-soon">
                  <img src={german} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">Hindi</div>
                <div className="language-nations-soon">
                  <img src={hindi} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">Chineese</div>
                <div className="language-nations-soon">
                  <img src={chinese} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">Spanish</div>
                <div className="language-nations-soon">
                  <img src={spanish} alt="" />
                </div>
              </div>
              <div className="language-box">
                <div className="language-name">Japanese</div>
                <div className="language-nations-soon">
                  <img
                    src={Japanese}
                    alt=""
                    style={{ border: '1px solid grey' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Homepage;
