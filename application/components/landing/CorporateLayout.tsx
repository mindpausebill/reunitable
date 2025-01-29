'use client';

import Container from '../shared/Container';
import ContentBox from '../shared/ContentBox';
import { Footer } from './Footer';
import { Header } from './header/Header';
import clsx from 'clsx';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface CorporateLayout {
  heroTitle: string;
  heroContent?: string | React.ReactNode;
  heroImage?: string;
  maxWidth?: string;
  contentMaxWidth?: string;
  heroImageMaxWidth?: string;
  heroImageTransform?: string;
  useOwnContainers?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  additionalContent?: React.ReactNode;
  isPhoto?: boolean;
}

export const CorporateLayout: React.FC<PropsWithChildren<CorporateLayout>> = ({
  children,
  maxWidth = 'max-w-8xl',
  contentMaxWidth = maxWidth,
  heroTitle,
  heroContent,
  heroImage,
  heroImageMaxWidth = 'max-w-sm',
  heroImageTransform,
  useOwnContainers,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  additionalContent,
  isPhoto
}) => {
  return (
    <>
      <div className="relative overflow-hidden bg-alpha-dark-600 pb-36">
        {isPhoto && (
          <>
            <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${heroImage})` }}></div>
            <div className="absolute inset-0 bg-alpha/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-alpha mix-blend-multiply"></div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-alpha to-alpha/0"></div>
        <Header />
        <Container
          className="relative mx-auto flex flex-col gap-6 py-16 font-medium text-alpha-light-200"
          maxWidth={maxWidth}
        >
          {heroImage && !isPhoto && (
            <img
              className={`absolute right-0 top-0 ${heroImageMaxWidth} ${heroImageTransform} pointer-events-none`}
              src={heroImage}
              alt=""
            />
          )}
          <div className="relative flex flex-col gap-3">
            <h1 className="font-heading text-4.5xl leading-[1.2] text-white md:max-w-2xl lg:max-w-3xl lg:text-6.5xl">
              {heroTitle}
            </h1>
            {heroContent && <p className={clsx('w-full max-w-4xl text-xl', heroImage && 'lg:w-3/5')}>{heroContent}</p>}
          </div>
          <div className="flex items-start gap-3 lg:flex-row lg:items-center lg:gap-6">
            {primaryButtonText && primaryButtonLink && (
              <Link
                className="[ reunitable-button ] border-charlie bg-charlie text-alpha-dark-700"
                href={primaryButtonLink}
              >
                {primaryButtonText}
              </Link>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Link className="[ reunitable-secondary-button ]" href={secondaryButtonLink}>
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </Container>
      </div>
      {useOwnContainers ? (
        children
      ) : (
        <Container className="relative -mt-36 pb-12" maxWidth={maxWidth}>
          <ContentBox maxWidth={contentMaxWidth}>{children}</ContentBox>
        </Container>
      )}
      {additionalContent}
    </>
  );
};
