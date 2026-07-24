import { unit1Topics } from './unit1.js';
import { unit2Topics } from './unit2.js';
import { unit3Topics } from './unit3.js';
import { unit4Topics } from './unit4.js';

export const allTopics = {
  1: unit1Topics,
  2: unit2Topics,
  3: unit3Topics,
  4: unit4Topics
};

export function getTopic(unitId, topicId) {
  const unit = allTopics[unitId];
  if (!unit) return null;
  return unit.find((t) => t.id === topicId) || null;
}

export function getUnitTopics(unitId) {
  return allTopics[unitId] || [];
}

export function getTotalTopics() {
  return Object.values(allTopics).reduce((sum, unit) => sum + unit.length, 0);
}
