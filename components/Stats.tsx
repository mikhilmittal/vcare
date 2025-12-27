export default function Stats() {
  const stats = [
    { number: "1,000,000+", label: "Patients Served Successfully" },
    { number: "700,000+", label: "Annual Patient Visits" },
    { number: "63", label: "Top Hospital Partnerships" },
    { number: "40+", label: "Cities Across India" },
  ];

  return (
    <section id="about" className="py-16 px-4 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Leading Home Health Care Company
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

