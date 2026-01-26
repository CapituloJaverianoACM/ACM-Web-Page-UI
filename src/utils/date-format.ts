export const formatDateEvent = ({
  date,
  start_hour,
}: {
  date: Date;
  start_hour: Date;
}) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  const optionsHour: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Bogota",
  };

  const LOCALE: string = "es-CO";

  const formattedDate = new Date(date).toLocaleDateString(LOCALE, optionsDate);
  const formattedInitialHour = new Date(start_hour).toLocaleTimeString(
    LOCALE,
    optionsHour,
  );

  // Solo mostramos la fecha y la hora de inicio (sin hora de fin)
  return `${formattedDate}, ${formattedInitialHour}`;
};
