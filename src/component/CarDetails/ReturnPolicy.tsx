const ReturnPolicy = () => {
  return (
    <div className="lg:ml-10 mt-6 lg:mt-0 p-4 lg:p-0 ">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        Rental Policy
      </h2>
      <hr className="mb-4" />
      <div className="space-y-3">
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">1.</span>
          <p>
            <span className="font-semibold text-gray-800">
              Pay only 50% now
            </span>
            ,{" "}
            <span className="text-gray-600">
              and the rest at the destination.
            </span>
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">2.</span>
          <p>
            <span className="text-gray-600">Cancel up to</span>
            <span className="font-semibold text-gray-800">
              {" "}
              48 hours before pick-up
            </span>
            , <span className="text-gray-600">and get a full refund.</span>
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">3.</span>
          <p>
            <span className="text-gray-600">
              This car requires a licence category
            </span>
            <span className="font-semibold text-gray-800"> AI</span>,{" "}
            <span className="text-gray-600">or equivalent.</span>
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">4.</span>
          <p>
            <span className="text-gray-600">You’ll need to be at least</span>
            <span className="font-semibold text-gray-800">
              {" "}
              18 years old
            </span>,{" "}
            <span className="text-gray-600">
              to rent it with 12 months driving experience.
            </span>
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">5.</span>
          <p>
            <span className="font-semibold text-gray-800">
              A refundable security deposit
            </span>{" "}
            <span className="text-gray-600">
              (24 € via debit card) is required on pickup.
            </span>
          </p>
        </div>
        <div className="flex items-start">
          <span className="text-red-500 font-bold mr-2">6.</span>
          <p>
            <span className="text-gray-600">This car includes</span>
            <span className="font-semibold text-gray-800">
              {" "}
              unlimited mileage
            </span>{" "}
            <span className="text-gray-600">per day in the price.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
