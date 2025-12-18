const ElectricianIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="41"
      viewBox="0 0 34 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <g filter="url(#filter0_f_1229_2628)">
        <ellipse
          cx="17"
          cy="55"
          rx="6"
          ry="3.5"
          fill="#4562C8"
          fillOpacity="0.5"
        />
      </g>
      <path
        d="M34 17.8077C34 27.3846 17 50.5 17 50.5C17 50.5 0 27.3846 0 17.8077C6.71846e-08 13.2174 1.79107 8.81513 4.97918 5.5693C8.1673 2.32348 12.4913 0.5 17 0.5C21.5087 0.5 25.8327 2.32348 29.0208 5.5693C32.2089 8.81513 34 13.2174 34 17.8077Z"
        fill="#4562C8"
      />
      <rect x="4" y="5" width="26" height="26" rx="13" fill="white" />
      <rect
        x="6"
        y="7"
        width="22"
        height="22"
        fill="url(#pattern0_1229_2628)"
      />
      <defs>
        <filter
          id="filter0_f_1229_2628"
          x="7"
          y="47.5"
          width="20"
          height="15"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="2"
            result="effect1_foregroundBlur_1229_2628"
          />
        </filter>
        <pattern
          id="pattern0_1229_2628"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1229_2628" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_1229_2628"
          width="100"
          height="100"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default ElectricianIcon;
