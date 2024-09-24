import FeaturedCars from "../../component/CardCard/FeaturedCars";
import HeroSection from "../../component/Home/Herosction";
import TestimonialsSlider from "../../component/Home/TestimonialsSlider";
import WhyChooseUs from "../../component/Home/WhyChooseus";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <div>
        <div className="container mx-auto">
          <FeaturedCars></FeaturedCars>

          <WhyChooseUs></WhyChooseUs>
        </div>
        {/* <CarPromoVideo></CarPromoVideo>
        <Testimonial></Testimonial> */}
        <TestimonialsSlider></TestimonialsSlider>
      </div>
    </div>
  );
};

export default HomePage;
