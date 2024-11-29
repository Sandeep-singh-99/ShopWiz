import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from '../assets/img1.webp'
import img2 from '../assets/img2.webp'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.webp'

export default function CarouselView() {
  return (
    <Carousel dynamicHeight emulateTouch infiniteLoop autoPlay showStatus={false} showArrows={false} showIndicators={false} showThumbs={false}>
      <div>
        <img src={img1} alt='not showing'/>
      </div>

      <div>
        <img src={img2} alt='not showing'/>
      </div>

      <div>
        <img src={img3} alt='not showing'/>
      </div>

      <div>
        <img src={img4} alt='not showing'/>
      </div>

      <div>
        <img src={img5} alt='not showing'/>
      </div>
      
    </Carousel>
  )
}
