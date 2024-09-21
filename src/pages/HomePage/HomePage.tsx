import HeroSection from "../../component/Home/Herosction";
import TestimonialsSlider from "../../component/Home/TestimonialsSlider";
import WhyChooseUs from "../../component/Home/WhyChooseus";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <div>
        <div className="container mx-auto">
          {/* <FeaturedCart></FeaturedCar
          <WhyChoose></WhyChoose> */}
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
