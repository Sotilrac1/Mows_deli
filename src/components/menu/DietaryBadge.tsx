import type { DietaryFlag } from '@/data/menu';

type DietaryBadgeProps = {
  type: DietaryFlag;
};

const badgeStyles: Record<DietaryFlag, string> = {
  vegetarian: 'bg-green-100 text-green-800',
  vegan: 'bg-green-900 text-green-100',
  'gluten-free': 'bg-amber-100 text-amber-900',
};

const badgeLabels: Record<DietaryFlag, string> = {
  vegetarian: '🌱 Végétarien',
  vegan: '🌿 Vegan',
  'gluten-free': '🌾 Sans gluten',
};

export const DietaryBadge = ({ type }: DietaryBadgeProps) => {
  return (
    <span className={`inline-flex font-mono text-xs px-2 py-0.5 ${badgeStyles[type]}`}>
      {badgeLabels[type]}
    </span>
  );
};
