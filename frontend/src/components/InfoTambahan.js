import './InfoTambahan.css';
import Slider from "react-slick";
import Card from './Card';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function InfoTambahan() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="Slider">
      <Slider {...settings}>
        <Card number="1"/>
        <Card number="2"/>
        <Card number="2"/>
        <Card number="3"/>
        <Card number="4"/>
      </Slider>   
    </div>
  );
}

export default InfoTambahan;
