import { expect, test } from 'vitest';
import { containsDuplicate, validateBoard } from '../games/Queens/Queens';

// Test case for empty board
const emptyBoard = ['']

test('should return false for empty board', () => {
  expect(containsDuplicate(emptyBoard)).toBe(false)
})
