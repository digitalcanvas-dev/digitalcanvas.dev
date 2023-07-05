import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { IndexSection } from '~/components/index/IndexSection';
import { useEffect, useRef, useState } from 'react';
import {
  IconCircleChevronLeft,
  IconCircleChevronRight,
} from '@tabler/icons-react';
import FancyQuote from '~/components/index/testimonials/FancyQuote.svg';

const ID_PREFIX = 'testimonial-';

const testimonialContent = [
  {
    id: `${ID_PREFIX}1`,
    name: 'Hollis M. (Business Owner & Designer)',
    quoteFragment: `[...] That kind of communication and ease of vision is invaluable to help with the efficiency and ease of every development, and it just shows how much of an expert he is in his field. I highly recommend Simon for any website development project! [...]`,
    fullQuote: `Working with Simon is always so easy and enjoyable! I've worked with a variety of website developers in the past, and Simon rises above as someone who is incredibly professional, responsive, honest, and kind. The integrity he carries in his work is felt through the whole experience, and it makes my job as a designer so much easier. What I might love most about working with Simon is that he's incredibly easy to communicate with, and he holds the vision of every project as clearly as I do. Working with other developers I've found I have to go above and beyond in my explanation of the project, but with Simon I've always felt he has an understanding of the details of each project after the first meeting. That kind of communication and ease of vision is invaluable to help with the efficiency and ease of every development, and it just shows how much of an expert he is in his field. I highly recommend Simon for any website development project!`,
  },
  {
    id: `${ID_PREFIX}2`,
    name: 'Paul A. (Eng. Manager)',
    quoteFragment: `[...] outstanding software engineer with remarkable technical leadership and a consistent track record of delivering high-quality work. [...] I highly recommend Simon for his technical expertise, professionalism, and commitment to excellence.`,
    fullQuote: `I am delighted to recommend Simon, an outstanding software engineer with remarkable technical leadership and a consistent track record of delivering high-quality work. Simon possesses a deep understanding of software engineering principles, excels at problem-solving, and consistently produces clean, efficient, and reliable code. His exceptional leadership skills and willingness to mentor others make him an invaluable asset to any team. I highly recommend Simon for his technical expertise, professionalism, and commitment to excellence.`,
  },
  {
    id: `${ID_PREFIX}3`,
    name: 'Ben T. (Product Manager)',
    quoteFragment: `[...] When building products together in the cybersecurity industry, there was little room for error, and Simon brought his high standards of technical ability to our team as a tech lead. From planning to delivery, he made sure our team kept the bar high while shipping iteratively. [...]`,
    fullQuote: `Simon is a great example of an engineering leader who’s passionate about what they build and who they build it with! \n When building products together in the cybersecurity industry, there was little room for error, and Simon brought his high standards of technical ability to our team as a tech lead. From planning to delivery, he made sure our team kept the bar high while shipping iteratively. \n He’s not only a talented engineer but also a teammate who readily engages others to both make progress and get to the bottom of issues. When working together, Simon’s shown a strong commitment to transparent communication and ambition to push through roadblocks. Because of this, he quickly builds trust on teams and sets a great example. \n Simon embodies ownership by being quick to volunteer and tackle challenges to help the team achieve its goals. To sum it up – he’s a top notch engineering leader who would be an incredibly valuable addition to any team!`,
  },
  {
    id: `${ID_PREFIX}4`,
    name: '',
    placeholder: true,
    quoteFragment: 'More coming soon!',
    fullQuote: 'More coming soon!',
  },
];

const TestimonialBox = ({
  id,
  quote,
  name,
  placeholder,
  w,
  highlight,
}: {
  id: string;
  quote: string;
  name: string;
  placeholder?: boolean;
  w: string;
  highlight: boolean;
}) => {
  return (
    <div
      id={id}
      className={`text-balance grid rounded-2xl ${
        placeholder ? 'content-center justify-center' : 'content-between'
      } ${highlight ? 'bg-white' : 'bg-white/70'}
      overflow-hidden p-4 font-body text-brand ${w}`}
    >
      {placeholder ? (
        <p className="font-light">{quote}</p>
      ) : (
        <p className="font-light">
          &ldquo;
          {quote}
          &rdquo;
        </p>
      )}
      {placeholder ? null : (
        <span className="grid auto-cols-auto grid-flow-col items-center justify-start gap-4">
          <img src={FancyQuote} alt="" className="text-brand" />
          <span className="font-heading text-sm font-bold">{name}</span>
        </span>
      )}
    </div>
  );
};

export const Testimonials = () => {
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const { getRef } = useRefManagerContext();

  const testimonialsRef = getRef('testimonials');

  const testimonialBlocksWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!testimonialBlocksWrapper?.current) {
      return;
    }

    const activeElementSelector = `#${testimonialContent[activeBlockIndex].id}`;

    const activeTestimonialElement: HTMLElement | null = document.querySelector(
      activeElementSelector
    );

    if (activeTestimonialElement) {
      testimonialBlocksWrapper.current.scrollTo({
        left: activeTestimonialElement.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [activeBlockIndex]);

  const onScroll = (direction: 'left' | 'right') =>
    setActiveBlockIndex((currentActive) => {
      if (direction === 'left') {
        return currentActive === 0 ? 0 : currentActive - 1;
      } else {
        return currentActive === testimonialContent.length - 1
          ? testimonialContent.length - 1
          : currentActive + 1;
      }
    });

  return (
    <IndexSection ref={testimonialsRef} bgColor="bg-brand">
      <div className="grid grid-flow-row auto-rows-auto justify-between gap-4 md:auto-cols-auto md:grid-flow-col md:gap-16">
        <div
          className="text-balance grid"
          style={{ gridTemplateRows: 'auto auto 1fr' }}
        >
          <h3 className="font-body text-sm capitalize text-white/50">
            Testimonials
          </h3>
          <p className="mb-8 font-heading text-3xl text-white md:mb-0">
            See what others are saying
          </p>
          <div className="mt-2 grid auto-cols-auto grid-flow-col gap-2 self-end justify-self-start md:justify-self-end">
            <IconCircleChevronLeft
              className={`${
                activeBlockIndex === 0
                  ? 'text-white/50'
                  : 'cursor-pointer text-white hover:scale-105'
              } h-11 w-11 transition-transform`}
              onClick={() => onScroll('left')}
            />
            <IconCircleChevronRight
              className={`${
                activeBlockIndex === testimonialContent.length - 1
                  ? 'text-white/50'
                  : 'cursor-pointer text-white hover:scale-105'
              } h-11 w-11  transition-transform`}
              onClick={() => onScroll('right')}
            />
          </div>
        </div>
        <div
          className="relative overflow-hidden"
          ref={testimonialBlocksWrapper}
        >
          <div className="grid h-80 w-1/2 auto-cols-auto grid-flow-col gap-10">
            {testimonialContent.map(
              ({ id, name, quoteFragment, placeholder }, index) => {
                return (
                  <TestimonialBox
                    id={id}
                    key={id}
                    name={name}
                    quote={quoteFragment}
                    placeholder={placeholder}
                    highlight={activeBlockIndex === index}
                    w="w-72"
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </IndexSection>
  );
};
