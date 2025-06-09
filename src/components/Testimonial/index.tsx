import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import React from "react";

import type { TestimonialProps, TestimonialSectionProps } from "./types";

import {
  StyledCarousel,
  TestimonialCard,
  TestimonialHeader,
  TestimonialWrapper,
} from "./styles";

const TestimonialItem: React.FC<TestimonialProps> = ({
  name,
  image,
  duration,
  content,
  rating,
  date,
}) => (
  <TestimonialCard>
    <div className="user-info">
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{duration}</p>
      </div>
    </div>
    <p className="content">{content}</p>
    <div className="footer">
      <span>{date}</span>
      <Rate disabled defaultValue={rating} />
      <span>
        {rating}
        /5.0
      </span>
    </div>
  </TestimonialCard>
);

const Testimonials: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <LeftOutlined />,
    nextArrow: <RightOutlined />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <TestimonialWrapper>
      <TestimonialHeader>
        <span className="tag">Testimonials</span>
        <h2>What Our Customers Says</h2>
      </TestimonialHeader>
      <StyledCarousel {...carouselSettings}>
        {testimonials.map(testimonial => (
          <TestimonialItem key={testimonial.id} {...testimonial} />
        ))}
      </StyledCarousel>
    </TestimonialWrapper>
  );
};

export default Testimonials;
