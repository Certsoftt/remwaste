export type TestimonialProps = {
  id: string;
  name: string;
  image: string;
  duration: string;
  content: string;
  rating: number;
  date: string;
};

export type TestimonialSectionProps = {
  testimonials: TestimonialProps[];
};
