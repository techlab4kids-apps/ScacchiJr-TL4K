import React from 'react';

export const RookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 39h27v-3H9v3zM12 33h21v-3H12v3zM10.5 30h24v-3h-24v3zM10.5 12V9h6v3h-6zM19.5 12V9h6v3h-6zM28.5 12V9h6v3h-6zM10.5 27h24V12h-24v15z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor"/>
  </svg>
);

export const QueenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 41h29v-4H8v4zM11.5 37h22v-4h-22v4zM12 33h21v-4H12v4zM14 29h17v-4H14v4zM11 14a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM25 14a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM39 14a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM12 25h21v-7s-3-4-10.5-4S12 18 12 18v7z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor"/>
  </svg>
);

export const PawnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.5 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zM12 39h21v-3H12v3zM15 33h15v-3H15v3zM17 30h11V19.5S22 18 22.5 18c.5 0 5.5 1.5 5.5 1.5V30z" stroke="black" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor"/>
  </svg>
);

export const ArrowUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(-90 12 12)" /></svg>
);
export const ArrowDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(90 12 12)" /></svg>
);
export const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(180 12 12)"/></svg>
);
export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
);

export const FlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" /></svg>
);

export const ClearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
);

export const SoundOnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
);

export const SoundOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
);

export const QuestionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M11.07 8.07C11.51 7.63 12 7 12 7c1.1 0 2 .9 2 2 0 .38-.14.73-.37 1.01l-1.18 1.18c-.48.48-.85.93-.85 1.81h-1.2c0-1.35.7-2.35 1.34-2.99l1.18-1.18C13.8 9.57 14 9.1 14 9c0-.55-.45-1-1-1-.34 0-.68.16-1.07.54l-1.06-1.06zM11 15h2v2h-2z"/></svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
);

export const ErrorCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
);

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
);

export const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11.5 21.9c-4.25-.46-7.5-3.99-7.5-8.4 0-.85.12-1.66.35-2.43l3.65 6.57c.55 1 1.6 1.63 2.75 1.63s2.2-.63 2.75-1.63l1.83-3.29-.01.01c.21.13.43.24.66.33l-2.73 4.93c-.56 1-1.6 1.63-2.75 1.63s-2.2-.63-2.75-1.63l-.9-1.63c-1.38.74-2.48 1.94-3.1 3.39zm8.53-2.23l-2.73-4.93c.23-.09.45-.2.66-.33l1.83 3.29c.55 1 1.6 1.63 2.75 1.63.03 0 .05 0 .08 0 1.25-.09 2.25-1.16 2.25-2.43 0-1.03-.65-1.9-1.54-2.25l-2.5-1c-.45-.18-.75-.63-.75-1.11 0-.39.22-.73.55-.91l.01-.01c.32-.17.54-.51.54-.88 0-.69-.56-1.25-1.25-1.25H14v-1h.25c.69 0 1.25-.56 1.25-1.25S14.94 7 14.25 7h-1.5c-.69 0-1.25.56-1.25 1.25S12.06 9.5 12.75 9.5h.5v1h-1.5c-1.38 0-2.5 1.12-2.5 2.5 0 .61.22 1.16.59 1.58l2.5 2.83c.45.51.71 1.17.71 1.86s-.26 1.35-.71 1.86l-.9 1.63c-.55 1-1.6 1.63-2.75 1.63s-2.2-.63-2.75-1.63l-3.65-6.57C4.12 9.66 4 8.85 4 8.01c0-4.41 3.25-8.01 7.5-8.01s7.5 3.6 7.5 8.01c0 2.25-1.01 4.35-2.69 5.86l.02.01z"/></svg>
);

export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);

export const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
);

export const InvalidMoveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.7 16.3a.996.996 0 001.41 0L12 14.42l1.89 1.89a.996.996 0 101.41-1.41L13.42 13l1.89-1.89a.996.996 0 10-1.41-1.41L12 11.58l-1.89-1.89a.996.996 0 10-1.41 1.41L10.58 13l-1.89 1.89c-.39.39-.39 1.02 0 1.41zM9 8h2.55v3.55H9V8zm3.45 3.55H15V8h-2.55v3.55z" fill="currentColor"/>
       <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 10 l4 -4"/>
        <path d="M16 10 l-4 -4"/>
      </g>
    </svg>
);