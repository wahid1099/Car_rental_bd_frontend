const ReturnPolicy = () => {
  return (
    <div className="lg:ml-10 mt-6 lg:mt-0 p-4 lg:p-0">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Rental Policy
      </h2>
      <hr className="mb-4" />
      <div className="space-y-5">
        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">1.</span>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">
              Pay only 50% now
            </span>
            , with the remaining balance due at your destination.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">2.</span>
          <p className="text-gray-600">
            Cancel up to{" "}
            <span className="font-semibold text-gray-800">
              48 hours before pick-up
            </span>
            , and receive a full refund.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">3.</span>
          <p className="text-gray-600">
            A valid driver's license of category{" "}
            <span className="font-semibold text-gray-800">AI</span> or
            equivalent is requiblue.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">4.</span>
          <p className="text-gray-600">
            You must be at least{" "}
            <span className="font-semibold text-gray-800">18 years old</span>,
            with a minimum of 12 months driving experience.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">5.</span>
          <p className="text-gray-600">
            A refundable security deposit of{" "}
            <span className="font-semibold text-gray-800">
              24 € via debit card
            </span>{" "}
            is requiblue at pickup.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">6.</span>
          <p className="text-gray-600">
            Enjoy{" "}
            <span className="font-semibold text-gray-800">
              unlimited mileage
            </span>
            , included in your daily rental price.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">7.</span>
          <p className="text-gray-600">
            All rentals include{" "}
            <span className="font-semibold text-gray-800">
              24/7 roadside assistance
            </span>{" "}
            for your peace of mind.
          </p>
        </div>

        <div className="flex items-start">
          <span className="text-blue-500 font-bold text-lg mr-2">8.</span>
          <p className="text-gray-600">
            Please return the vehicle in the same condition to avoid additional
            charges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
