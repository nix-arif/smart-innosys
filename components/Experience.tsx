import ExprienceWrapper from "./ExprienceWrapper";

const experiences = [
  {
    title: "Startup company Baiduri Marketing Enterprise",
    date: "2014",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "Participating with a lot of government projects",
    date: "2014 - 2021",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    title: "METRUM Cyroflex Surgical Diode Laser",
    date: "2023",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];
const Experience = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1>Experience</h1>

      <ol className="items-center sm:flex">
        {experiences.map((item, index) => (
          <ExprienceWrapper
            key={index}
            title={item.title}
            date={item.date}
            description={item.description}
            isLast={index === experiences.length - 1}
          />
        ))}
      </ol>
    </div>
  );
};

export default Experience;
