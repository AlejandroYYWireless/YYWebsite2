import { NumberTicker } from "@/components/magicui/number-ticker";

const Metrics = () => {
  const metrics = [
    {
      title: "Devices Refurbished",
      valueData: {
        number: 25000,
        prefix: "",
        suffix: " devices",
      },
      description:
        "We've refurbished over 25,000 devices, keeping them out of landfills.",
    },
    {
      title: "E-Waste Diverted",
      valueData: {
        number: 3.5,
        prefix: "",
        suffix: " tons",
      },
      description:
        "Each phone we refurbish saves approximately 0.14 kg of e-waste — totaling 3.5 tons diverted from landfills this year.",
    },
    {
      title: "CO₂ Emissions Saved",
      valueData: {
        number: 1250,
        prefix: "",
        suffix: " tons",
      },
      description:
        "Each refurbished phone saves an average of 50 kg of CO₂ emissions compared to manufacturing a new one — equivalent to planting 5,000 trees.",
    },
    {
      title: "Water Saved",
      valueData: {
        number: 300,
        prefix: "",
        suffix: " million liters",
      },
      description:
        "Producing a new smartphone uses up to 12,000 liters of water — our refurbishing has saved over 300 million liters to date.",
    },
  ];

  return (
    <div className="relative w-full bg-black py-[300px]">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-stone-800 to-transparent"></div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-800 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Environmental Impact Metrics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm border border-stone-700 rounded-lg p-6 flex flex-col items-center"
            >
              <h3 className="text-stone-400 text-lg font-medium mb-3">
                {metric.title}
              </h3>
              <div className="text-3xl font-bold text-white mb-4 flex items-center">
                {metric.valueData.prefix && (
                  <span>{metric.valueData.prefix}</span>
                )}
                <NumberTicker
                  className="text-white"
                  value={metric.valueData.number}
                />
                {metric.valueData.suffix && (
                  <span className="ml-1">{metric.valueData.suffix}</span>
                )}
              </div>
              <p className="text-stone-300 text-center text-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
