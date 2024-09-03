import Image from "next/image";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900">
      <div className="fixed top-8 h-screen flex flex-col justify-between opacity-30">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="">
            <FloatingImages />
          </div>
        ))}
      </div>
      <div className="flex w-screen justify-center h-screen relative">
        {children}
      </div>
    </div>
  );
}

function FloatingImages() {
  const randome = () => {
    const imgs = [
      "./stone.svg",
      "./scissors.svg",
      "./paper.svg",
      "./solana.svg",
    ];

    for (let i = imgs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imgs[i], imgs[j]] = [imgs[j], imgs[i]];
    }

    return [...imgs];
  };
  const images = randome();

  return (
    <div className="w-screen flex  justify-between">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          className="h-28 flex justify-between p-2 "
          width={112}
          height={112}
          alt=""
        />
      ))}
    </div>
  );
}
