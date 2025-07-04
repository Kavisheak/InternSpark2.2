const FilterTabs = ({ activeFilter, setActiveFilter, counts }) => {
  const tabs = [
    { name: "All Users", count: counts["All Users"] },
    { name: "Students", count: counts["Students"] },
    { name: "Companies", count: counts["Companies"] },
    { name: "Pending", count: counts["Pending"] },
  ];

  return (
    <div className="flex gap-1 mb-8 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          type="button"
          onClick={() => setActiveFilter(tab.name)}
          className={`rounded-none border-b-2 px-4 py-3 font-medium transition-colors ${
            activeFilter === tab.name
              ? "border-purple-600 bg-purple-50 text-purple-700 hover:bg-purple-50"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {tab.name} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
