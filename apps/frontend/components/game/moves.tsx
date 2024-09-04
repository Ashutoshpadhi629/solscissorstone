import Image from "next/image";
import { Button } from "../ui/button";

export function Moves() {
  return (
    <div>
      <div className="flex space-x-2">
        {Images.map((p, index) => (
          <MovesButton key={index}>
            <p className="font-bold">{p.name}</p>
            <Image src={p.svg} width={40} height={40} alt={p.name}></Image>
          </MovesButton>
        ))}
      </div>
      <p className="font-thin p-2"> Select your Move</p>
    </div>
  );
}

function MovesButton({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Button
        className="flex-col h-16 dark:bg-slate-900 dark:hover:bg-slate-700"
        variant={"outline"}
      >
        {children}
      </Button>
    </div>
  );
}

const Images = [
  {
    name: "STONE",
    svg: "./stone.svg",
  },
  {
    name: "PAPER",
    svg: "./paper.svg",
  },
  {
    name: "SCISSORS",
    svg: "./scissors.svg",
  },
];
