export default function ContactCard({
  href,
  icon: Icon,
  type,
  value,
  accentColor = "#E0D7EA", // soft accent background
  iconColor = "#5E2E91",   // 1. Renamed 'primaryColor' to 'iconColor'
  fontFamily,
}) {
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-start gap-4 rounded-xl border border-gray-100 
        bg-[#F9F7FB] p-3 shadow-sm hover:shadow-md transition-all duration-200
      "
      style={{ fontFamily }}
    >
      {/* Icon Container */}
      <div
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
        style={{ backgroundColor: accentColor }}
      >
        {/* 2. Fixed the typo 'Iconcolo' to 'iconColor' */}
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-700">{type}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </a>
  );
}