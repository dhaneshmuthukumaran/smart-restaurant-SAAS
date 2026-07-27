// Re-export the properly styled landing components
// These components import Landing.module.css for dark-themed styling.
// They live in features/landing/ (outside src/), so we go up 3 levels.

export { default as HeroSection } from '../../../features/landing/components/HeroSection'
export { default as FeaturesSection } from '../../../features/landing/components/FeaturesSection'
export { default as HowItWorks } from '../../../features/landing/components/HowItWorks'
export { default as CTASection } from '../../../features/landing/components/CTASection'
export { default as DownloadedImage } from '../../../features/landing/components/DownloadedImage'
