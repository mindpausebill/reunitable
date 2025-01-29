'use client';

import Container from '../shared/Container';
import { Footer } from './Footer';
import { Header } from './header/Header';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

interface HomePageLayoutProps {
  heroTitle: string;
  heroContent?: string | React.ReactNode;
  maxWidth?: string;
  contentMaxWidth?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  heroImage?: string;
  heroImageMaxWidth?: string;
  heroImageTransform?: string;
  isPhoto?: boolean;
}

export const HomePageLayout: React.FC<PropsWithChildren<HomePageLayoutProps>> = ({
  children,
  maxWidth = 'max-w-8xl',
  heroTitle,
  heroContent,
  primaryButtonText,
  secondaryButtonText,
  heroImage,
  primaryButtonLink,
  secondaryButtonLink,
  heroImageTransform,
  heroImageMaxWidth,
  isPhoto
}) => {
  return (
    <>
      <div className="relative overflow-hidden bg-alpha-dark-600 pb-12">
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
          className="relative mx-auto flex flex-col items-center gap-12 pt-9 text-alpha-light-200 lg:flex-row lg:justify-between lg:gap-12 lg:py-16"
          maxWidth={maxWidth}
        >
          <div className="relative flex flex-col gap-3">
            <h1 className="font-heading text-3xl leading-[1.2] text-white md:max-w-2xl lg:max-w-3xl lg:text-4.5xl">
              {heroTitle}
            </h1>
            {heroContent && <p className="flex max-w-md flex-col gap-9 pr-6 lg:max-w-3xl lg:text-2xl">{heroContent}</p>}
          </div>

          <div className="flex flex-col gap-3 lg:items-center lg:gap-6">
            {heroImage && !isPhoto && (
              <img
                className={`${heroImageMaxWidth} ${heroImageTransform} pointer-events-none`}
                src={heroImage}
                alt=""
              />
            )}
            <div className="flex flex-col flex-wrap gap-2 lg:flex-row lg:items-center lg:justify-center lg:gap-6">
              {primaryButtonText && primaryButtonLink && (
                <div className="flex flex-shrink-0 flex-nowrap">
                  <Link className="[ reunitable-button ] border-bravo bg-bravo text-white" href={primaryButtonLink}>
                    {primaryButtonText}
                  </Link>
                </div>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <div>
                  <Link
                    className="[ reunitable-secondary-button ] border-charlie bg-charlie text-alpha-dark-600"
                    href={secondaryButtonLink}
                  >
                    {secondaryButtonText}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      <div className="relative">{children}</div>
      <Footer />
    </>
  );
};
