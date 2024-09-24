import { useParams } from "react-router-dom";
import { carApi } from "../../redux/features/Car/CarApi";
import CarDetailsCard from "../../component/CarDetails/CarDetailsCard";
import CarInformation from "../../component/CarDetails/CarInformation";
import { BounceLoader } from "react-spinners";

const CarViewDetails = () => {
  const { id } = useParams();

  const { data: carSingleData, isFetching } = carApi.useGetSingleCarsQuery(
    id as string
  );
  const carDetails = carSingleData?.data;

  return (
    <div>
      {isFetching ? (
        <div className="flex justify-center items-center ">
          <BounceLoader size={100} color="pink" />
        </div>
      ) : (
        <>
          <CarDetailsCard carDetails={carDetails} />

          <div className="container mx-auto">
            <CarInformation carDetails={carDetails} />
          </div>
        </>
      )}
    </div>
  );
};

export default CarViewDetails;
