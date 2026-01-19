interface VideoCardProps {
  number: number;
  videoSrc?: string;
  title: string;
  subtitle?: string;
}

export default function VideoCard({
  videoSrc,
  title,
  subtitle,
}: VideoCardProps) {
  // Convertir link de YouTube a formato embed
  const getEmbedUrl = (url: string) => {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else {
      return url;
    }

    // Agregar parámetros para mostrar todos los controles de YouTube y máxima calidad
    return `https://www.youtube.com/embed/${videoId}?controls=1&rel=0&showinfo=1&vq=hd1080`;
  };

  const isYouTube =
    videoSrc &&
    (videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be"));

  return (
    <div className="rounded-3xl bg-[var(--azul-niebla)] dark:bg-[var(--azul-ultramar)] p-6 shadow-lg w-full transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--azul-crayon)]/30 dark:hover:shadow-[var(--azul-electrico)]/40 hover:scale-[1.02]">
      {/* Video Player Container - 16:9 Aspect Ratio */}
      <div className="relative w-full bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl overflow-hidden mb-4 aspect-video flex items-center justify-center">
        {videoSrc ? (
          isYouTube ? (
            <iframe
              src={getEmbedUrl(videoSrc)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              controls
            />
          )
        ) : (
          <>
            {/* Play Button Icon */}
            <div className="absolute flex items-center justify-center w-20 h-20 rounded-full bg-[var(--azul-crayon)] hover:bg-[var(--azul-electrico)] transition-colors cursor-pointer shadow-lg">
              <svg
                className="w-8 h-8 text-[var(--white)] fill-current ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Text Content */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-[var(--azul-noche)] dark:text-[var(--azul-niebla)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-[var(--azul-ultramar)] dark:text-[var(--azul-niebla)] opacity-80 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
