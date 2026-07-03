export default function Stats() {
  const badges = [
    {
      label: "Verified Doctors & Nurses",
      icon: (
        <svg className="h-8 w-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 20a7 7 0 0114 0" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 8v6" />
        </svg>
      ),
    },
    {
      label: "Quick Home Visits",
      icon: (
        <svg className="h-8 w-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Transparent Pricing",
      icon: (
        <svg className="h-8 w-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v3" />
        </svg>
      ),
    },
    {
      label: "Jamshedpur's Own Home Care",
      icon: (
        <svg className="h-8 w-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9.5L12 4l9 5.5" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 22V12h6v10" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="py-16 px-4 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Now Serving Jamshedpur</h2>
        <p className="text-center text-primary-100 mb-10">Bringing trusted home healthcare to your doorstep in Jamshedpur</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((b, index) => (
            <div key={index} className="text-center">
              {b.icon}
              <div className="text-base font-semibold text-primary-100">{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

