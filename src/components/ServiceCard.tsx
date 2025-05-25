import React, { useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ServiceCardProps {
  icon: FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  gradient: string;
}

const routeMap: Record<string, string> = {
  'College Counseling': '/services/college-counseling',
  'Test Prep': '/services/test-prep',
  'Executive Functioning Coaching': '/services/executive-functioning',
  'Subject Tutoring': '/services/tutoring',
  'Graduate Admissions Advising': '/services/graduate-admissions',
  'Events': '/resources/events',
};

const ServiceCard: FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();
  const href = routeMap[title] || '/';

  const handleClick = () => {
    navigate(href);
    // ensure scroll to top on the newly loaded page
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="
        group
        w-full
        max-w-[370px]
        h-[280px]
        perspective-1000
        cursor-pointer
        mx-auto
      "
    >
      <div
        className={`
          relative w-full h-full
          transition-transform duration-700
          transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* ───── FRONT ───── */}
        <div
          className={`
            absolute inset-0 w-full h-full
            backface-hidden rounded-2xl shadow-xl
            ${gradient}
            p-6 flex flex-col items-center justify-center space-y-4
            text-white
          `}
        >
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
            <Icon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-center line-clamp-2">
            {title}
          </h3>
          <div className="w-12 h-1 bg-white/50 rounded-full"></div>
        </div>

        {/* ───── BACK ───── */}
        <div className="
            absolute inset-0 w-full h-full
            backface-hidden rotate-y-180
            rounded-2xl shadow-xl
            bg-white
          "
        >
          <div className="relative w-full h-full">
            {/* scrollable area pinned between top padding and button */}
            <div className="
                absolute top-6 left-6 right-4 bottom-12
                overflow-y-auto flex items-start space-x-4
              "
            >
              <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                  {title}
                </h3>
                <p className="
                  text-gray-600 leading-relaxed
                  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                  pr-2
                ">
                  {description}
                </p>
              </div>
            </div>

            {/* button bar pinned at bottom */}
           <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-100 bg-white">
  <button
    onClick={e => { e.stopPropagation(); handleClick(); }}
    className="
      w-full py-2
      bg-[#0085c2]
      text-white rounded-lg
      hover:bg-[#FFB546]
      transition-colors duration-300
      shadow-md hover:shadow-lg
    "
  >
    Learn More
  </button>
</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default ServiceCard;