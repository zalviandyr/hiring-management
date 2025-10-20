import Image from "next/image";

export const ApplySuccess = () => {
  return (
    <div className="flex flex-col w-full justify-center mt-32 items-center gap-4">
      <div className="relative h-80 w-80">
        <Image src={"/images/apply-success.png"} alt="Empty" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold text-xl">🎉 Your application was sent!</span>
        <span className="text-center">
          Congratulations! You've taken the first step towards a rewarding career at Rakamin.
          <br />
          We look forward to learning more about you during the application process.
        </span>
      </div>
    </div>
  );
};
