import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Custom mark: overlapping rounded shapes forming an abstract "booking check" */}
      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          className="h-9 w-9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="logoGrad"
              x1="0"
              y1="0"
              x2="36"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
          </defs>
          <rect
            x="1"
            y="1"
            width="34"
            height="34"
            rx="10"
            fill="url(#logoGrad)"
          />
          <rect
            x="1"
            y="1"
            width="34"
            height="34"
            rx="10"
            stroke="white"
            strokeOpacity="0.15"
          />
          {/* abstract calendar/check mark */}
          <rect
            x="10"
            y="9"
            width="16"
            height="15"
            rx="3"
            stroke="white"
            strokeWidth="2"
          />
          <path d="M10 14.5H26" stroke="white" strokeWidth="2" />
          <path
            d="M13.5 18.5L16 21L22.5 14.5"
            stroke="#fb923c"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="flex items-baseline font-extrabold text-lg leading-none tracking-tight">
        <span className="text-slate-800 dark:text-slate-100">Service</span>
        <span className="mx-[1px] h-1.5 w-1.5 self-center rounded-full bg-orange-500" />
        <span className="text-teal-600 dark:text-teal-400">Book</span>
      </span>
    </Link>
  );
}
