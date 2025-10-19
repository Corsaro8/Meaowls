import { Fragment } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';

const tiers = [
{ name: 'Starter', id: 'tier-starter', href: '#', priceMonthly: '$19', mostPopular: false },
{ name: 'Growth', id: 'tier-growth', href: '#', priceMonthly: '$49', mostPopular: true },
{ name: 'Scale', id: 'tier-scale', href: '#', priceMonthly: '$99', mostPopular: false }];

const sections = [
{
  name: 'Features',
  features: [
  { name: 'Edge content delivery', tiers: { Starter: true, Growth: true, Scale: true } },
  { name: 'Custom domains', tiers: { Starter: '1', Growth: '3', Scale: 'Unlimited' } },
  { name: 'Team members', tiers: { Starter: '3', Growth: '20', Scale: 'Unlimited' } },
  { name: 'Single sign-on (SSO)', tiers: { Starter: false, Growth: false, Scale: true } }]

},
{
  name: 'Reporting',
  features: [
  { name: 'Advanced analytics', tiers: { Starter: true, Growth: true, Scale: true } },
  { name: 'Basic reports', tiers: { Starter: false, Growth: true, Scale: true } },
  { name: 'Professional reports', tiers: { Starter: false, Growth: false, Scale: true } },
  { name: 'Custom report builder', tiers: { Starter: false, Growth: false, Scale: true } }]

},
{
  name: 'Support',
  features: [
  { name: '24/7 online support', tiers: { Starter: true, Growth: true, Scale: true } },
  { name: 'Quarterly workshops', tiers: { Starter: false, Growth: true, Scale: true } },
  { name: 'Priority phone support', tiers: { Starter: false, Growth: false, Scale: true } },
  { name: '1:1 onboarding tour', tiers: { Starter: false, Growth: false, Scale: true } }]

}];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function WithComparisonTable() {
  return null;
}