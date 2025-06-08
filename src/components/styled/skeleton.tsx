import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.05) 8%,
    rgba(255, 255, 255, 0.1) 18%,
    rgba(255, 255, 255, 0.05) 33%
  );
  background-size: 2000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: clamp(8px, 2vw, 12px);
`;

export const CardSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: clamp(150px, 30vw, 200px);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
`;

type TextLineSkeletonProps = {
  $width?: string;
  $height?: string;
};

export const TextLineSkeleton = styled(SkeletonBase)<TextLineSkeletonProps>`
  width: ${props => props.$width || "100%"};
  height: ${props => props.$height || "clamp(18px, 4vw, 24px)"};
  margin-bottom: clamp(0.375rem, 1vw, 0.5rem);
`;

type CircleSkeletonProps = {
  $size?: string;
};

export const CircleSkeleton = styled(SkeletonBase)<CircleSkeletonProps>`
  width: ${props => props.$size || "clamp(32px, 8vw, 40px)"};
  height: ${props => props.$size || "clamp(32px, 8vw, 40px)"};
  border-radius: 50%;
`;

export const ButtonSkeleton = styled(SkeletonBase)`
  width: clamp(160px, 40vw, 200px);
  height: clamp(40px, 8vw, 48px);
  margin: clamp(0.75rem, 2vw, 1rem) 0;
`;

export const InputSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: clamp(48px, 10vw, 56px);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
`;

export const PaymentModalSkeleton = styled.div`
  padding: clamp(1.5rem, 4vw, 2rem);

  ${TextLineSkeleton}:nth-child(1) {
    width: clamp(75%, 70vw, 80%);
    height: clamp(24px, 5vw, 32px);
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
  }

  ${TextLineSkeleton}:nth-child(2) {
    width: clamp(50%, 45vw, 60%);
    margin-bottom: clamp(1.5rem, 4vw, 2rem);
  }

  ${InputSkeleton} {
    margin-bottom: clamp(1.25rem, 3vw, 1.5rem);
  }

  ${ButtonSkeleton}:last-child {
    margin-top: clamp(1.5rem, 4vw, 2rem);

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;

export const PaymentCardSkeleton = styled.div`
  padding: clamp(1.25rem, 3vw, 1.5rem);
  background: rgba(30, 30, 35, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: clamp(12px, 2vw, 16px);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);

  ${TextLineSkeleton}:first-child {
    width: clamp(60%, 55vw, 70%);
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
  }

  ${TextLineSkeleton}:nth-child(2) {
    width: clamp(35%, 30vw, 40%);
  }

  @media (max-width: 480px) {
    padding: 1rem;

    ${TextLineSkeleton}:first-child {
      width: 80%;
    }

    ${TextLineSkeleton}:nth-child(2) {
      width: 50%;
    }
  }
`;

export const OrderSummarySkeleton = styled.div`
  background: rgba(30, 30, 35, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;

  ${TextLineSkeleton} {
    margin-bottom: 1rem;
  }

  ${ButtonSkeleton} {
    margin-top: 2rem;
  }
`;

export const ProgressStepsSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${CircleSkeleton} {
    margin-bottom: 0.5rem;
  }

  ${TextLineSkeleton} {
    width: 100px;
  }
`;

export const WasteTypeSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;

  ${CardSkeleton} {
    height: 180px;
  }
`;

export const SkipSizeSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;

  ${CardSkeleton} {
    height: 250px;
  }
`;

export const ModalSkeleton = styled.div`
  padding: 2rem;

  ${TextLineSkeleton}:first-child {
    width: 70%;
    height: 32px;
    margin-bottom: 1rem;
  }

  ${TextLineSkeleton}:nth-child(2) {
    width: 90%;
    margin-bottom: 2rem;
  }

  ${ButtonSkeleton} {
    margin-top: 2rem;
  }
`;

export const SkipCardSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 400px;
  background: rgba(45, 45, 45, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 1.5rem;
  }

  &::after {
    content: '';
    display: block;
    padding: 1.5rem;
    flex: 1;
  }
`;

export const SkipGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
`;

export const WasteCardSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 150px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

export const WasteTypeGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;
