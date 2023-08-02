
import Particles from "react-tsparticles";

import { InfinitySpin } from  'react-loader-spinner'

import { loadFull } from "tsparticles";
import './App.css';
import React, { useEffect, useRef, useState } from 'react'
import { uploadfile } from './services/api';

function App() {
  const [file, setfile] = useState()
  const [resullt, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef()
  console.log(file);

  const onUploadClick = () => {
    fileInputRef.current.click()
  }

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  useEffect(() => {
    const getImage = async () => {
      if(file){
        const data = new FormData()
        data.append("name" , file.name)
        data.append("file" , file)
        setLoading(true)

       let response = await uploadfile(data)
       setLoading(false)
       setResult(response.path)
      
      }
    }
  
    getImage()

  }, [file])
  
  
  return (
    <div className="animate__animated animate__fadeIn App">
      <div>
      
         <Particles
          id="tsparticles"
          init={particlesInit}
          style={{background:'black !important'}}

      options={{
        "fullScreen": {
            "enable": true,
            "zIndex": 1,
            
        },
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "circle",
                "options": {
                    "sides": 1
                }
            },
            "opacity": {
                "value": 0.8,
                "random": false,
                "animation": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": false,
                "animation": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "rotate": {
                "value": 0,
                "random": true,
                "direction": "clockwise",
                "animation": {
                    "enable": true,
                    "speed": 5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 600,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 4,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": ["repulse"]
                },
                "onclick": {
                    "enable": false,
                    "mode": "bubble"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 200,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 5,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 150
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
        "background": {
            "color": "#000",
            "image": "",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        }
    }}
    />
    
    </div>
    <div className='App-details'> 
    <span>Welcome to <strong>File Linker</strong> !</span>
      <div className='App-details-top'>
      <button onClick={() => onUploadClick()}>Upload</button>

      </div>
      <input ref={(fileInputRef)} type="file" onChange={e => setfile(e.target.files[0])} style={{display:'none'}}/>
      <div className='App-details-bottom'>
        
      {resullt ? 
<div className="animate__animated animate__fadeInUp downloadLink"><p>Click below URL to Download or Share with anyone</p>{loading ? <InfinitySpin width='100' heigth='50' color="#fff"/> : <a href={resullt}> {resullt} </a>}</div> : <div className="download"> <p> Download URL will come here...</p>{loading && <InfinitySpin width='100' heigth='50' color="#fff"/>}</div>}
      </div>
    </div>
    </div>
  );
}

export default App;
