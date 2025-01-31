import { expect, test } from 'vitest';
import { containsDuplicate, validateBoard } from '../games/Queens/Queens';

// containsDuplicate
test('should return false for empty array', () => {
  expect(containsDuplicate([])).toBe(false);
});

test('should return false for array with single element', () => {
  expect(containsDuplicate(['1'])).toBe(false);
});

test('should return false when array has no duplicates', () => {
  expect(containsDuplicate(['1', '2', '3'])).toBe(false);
})

test('should return true when array has duplicates', () => {
  expect(containsDuplicate(['1', '2', '1'])).toBe(true);
  expect(containsDuplicate(['1', '1', '1'])).toBe(true);
  expect(containsDuplicate(['1', '2', '2', '3'])).toBe(true);
  expect(containsDuplicate(['1', '2', '3', '2'])).toBe(true);
});


// validateBoard
test('validateBoard returns false when queens share same row', () => {
  expect(containsDuplicate(['1', '2', '3'])).toBe(false);
  expect(containsDuplicate(['4', '5', '6'])).toBe(false);
  expect(containsDuplicate(['4', '5', '6'])).toBe(false);
  const pieces = ['0#3', '0#4', '2#2', '3#0', '4#1'];
  const squares = [
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 1}, {text: '👑', color: 0}],
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '', color: 1}, {text: '', color: 1}],
    [{text: '', color: 2}, {text: '', color: 3}, {text: '👑', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '👑', color: 2}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '', color: 4}, {text: '👑', color: 4}, {text: '', color: 4}, {text: '', color: 3}, {text: '', color: 3}]
  ];
  expect(validateBoard(pieces, squares)).toBe(false);
});

test('validateBoard returns false when queens share same column', () => {
  const pieces = ['0#4', '1#3', '2#2', '3#0', '4#0'];
  const squares = [
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 0}],
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 1}, {text: '', color: 1}],
    [{text: '', color: 2}, {text: '', color: 3}, {text: '👑', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '👑', color: 2}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '👑', color: 4}, {text: '', color: 4}, {text: '', color: 4}, {text: '', color: 3}, {text: '', color: 3}]
  ];
  expect(validateBoard(pieces, squares)).toBe(false);
});

test('validateBoard returns false when queens share same color', () => {
  const pieces = ['0#4', '1#3', '2#2', '3#1', '4#0'];
  const squares = [
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 0}],
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 1}, {text: '', color: 1}],
    [{text: '', color: 2}, {text: '', color: 3}, {text: '👑', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '', color: 2}, {text: '👑', color: 3}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '👑', color: 4}, {text: '', color: 4}, {text: '', color: 4}, {text: '', color: 3}, {text: '', color: 3}]
  ];
  expect(validateBoard(pieces, squares)).toBe(false);
});

test('validateBoard returns true when queens are different row, column, color', () => {
  const pieces = ['0#4', '1#3', '2#2', '3#0', '4#1'];
  const squares = [
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 0}],
    [{text: '', color: 2}, {text: '', color: 1}, {text: '', color: 1}, {text: '👑', color: 1}, {text: '', color: 1}],
    [{text: '', color: 2}, {text: '', color: 3}, {text: '👑', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '👑', color: 2}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}, {text: '', color: 3}],
    [{text: '', color: 4}, {text: '👑', color: 4}, {text: '', color: 4}, {text: '', color: 3}, {text: '', color: 3}]
  ];
  expect(validateBoard(pieces, squares)).toBe(true);
});
