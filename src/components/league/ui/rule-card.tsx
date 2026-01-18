export function RuleCard({
  // this is the component for each rule section, so all the rules have the same style.
  icon,
  title,
  children, // this is the same as description.
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    //style of the card as the one said.
    <div className="rounded-[32px] overflow-hidden bg-[rgba(var(--azul-niebla-rgb)/0.8)] dark:bg-[rgba(var(--azul-noche-rgb)/0.4)] border border-[rgba(var(--azul-niebla-rgb)/1)] dark:border-[rgba(var(--azul-noche-rgb)/0.4)] shadow-sm dark:shadow-md px-6 py-6 md:px-8 md:py-7">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-[var(--azul-electrico)] p-3 shadow-sm">
          <div className="text-white">{icon}</div>
        </div>
        {/* Style of the content on the card */}
        <div className="min-w-0">
          <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white mb-2">
            {title}
          </h3>
          <div className="mt-4 text-gray-700 dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
