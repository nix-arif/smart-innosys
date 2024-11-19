/* eslint-disable no-unused-vars */
import { BorderBeam } from "@/components/ui/border-beam";
import Image from "next/image";

export function BorderBeamDemo() {
  return (
    <div className="grid md:grid-cols-3 items-center justify-center gap-4">
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/laser-PLDD.jpg"
          alt="pldd"
          width={600}
          height={600}
          className="rounded-md mb-4 object-cover"
        />
        <h1 className="text-2xl font-semibold text-center">PLDD</h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/laser-EVLT.jpg"
          alt="logo"
          width={600}
          height={600}
          className="rounded-md mb-4 object-bottom"
        />
        <h1 className="text-2xl font-semibold text-center">EVLT</h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/laser-Proctology.jpg"
          alt="logo"
          width={400}
          height={400}
          className="rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold text-center">PROCTOLOGY</h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/swing15.jpg"
          alt="logo"
          width={400}
          height={400}
          className="rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold text-center">
          SURGICAL DIODE LASER
        </h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/surgicalinstruments.jpg"
          alt="logo"
          width={400}
          height={400}
          className="rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold text-center">
          SURGICAL INSTRUMENTS
        </h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <div className="relative overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Image
          src="/images/laser-FILAC.jpg"
          alt="logo"
          width={400}
          height={400}
          className="rounded-md mb-4"
        />
        <h1 className="text-2xl font-semibold text-center">FILAC</h1>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  );
}
