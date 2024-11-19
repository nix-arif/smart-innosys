type ExperienceWrapperProps = {
  title: string;
  date: string;
  description: string;
  isLast: boolean;
};

const ExprienceWrapper = ({
  title,
  date,
  description,
  isLast = false,
}: ExperienceWrapperProps) => {
  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="gold"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-award"
          >
            <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
            <circle cx="12" cy="8" r="6" />
          </svg>
        </div>
        {!isLast && (
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        )}
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {date}
        </time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </li>
  );
};

export default ExprienceWrapper;
