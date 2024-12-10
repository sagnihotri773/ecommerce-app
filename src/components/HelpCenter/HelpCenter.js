export const HelpCenterQuestion = ({ helpCenterQuestion }) => {
  return (
    <div className="container relative md:mt-24 mt-16 m-auto">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
          Get Started
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Upgrade your style with our curated sets. Choose confidence, embrace
          your unique look.
        </p>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-8 gap-6">
        {helpCenterQuestion?.length > 0 &&
          helpCenterQuestion?.map((item) => (
            <div className="flex">
              <div className="fea icon-ex-md text-primary me-3 size-5 mt-1">
                {item?.icon}
              </div>
              <div className="flex-1">
                <h5 className="mb-2 text-xl font-semibold">{item?.question}</h5>
                <p className="text-slate-400">{item?.answer}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
