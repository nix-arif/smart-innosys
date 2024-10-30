import Image from "next/image";
import logo from "@/images/LogoEarthWhiteWithName.png";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src={logo}
        width={200}
        height={200}
        alt="smartinnosys"
        className="mb-12"
      />
      {children}
    </div>
  );
};

export default layout;
