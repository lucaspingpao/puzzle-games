import { expect, test } from 'vitest';
import { containsDuplicate, validateBoard } from '../games/Queens/Queens';

// Test case for empty board

test('should return false for empty board', () => {
  expect(containsDuplicate([''])).toBe(false)
})

test('should return true for board with duplicate', () => {
  expect(containsDuplicate(['1', '1'])).toBe(true)
})

test('should return true for a single coordinate', () => {
  expect(validateBoard(['0#0'], [[{text: 'x', color: 1}]])).toBe(true)
})