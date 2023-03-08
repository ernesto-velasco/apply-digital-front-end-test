import { pager } from 'utils/getPaginationRange'

describe('Return an object with pagination structure', () => {
  const result = pager(1, 20)
  test('Should return an object', () => {
    expect(typeof result).toBe('object')
  })
  test('Should always return an object with a length of 7', () => {
    expect(result).toHaveLength(7)
  })
  test('Should return the correct format', () => {
    expect(result).toEqual([1, 2, 3, 4, 5, '...', 20])
  })
  test('Should return the correct format', () => {
    const result = pager(6, 20)
    expect(result).toEqual([1, '...', 5, 6, 7, '...', 20])
  })
})
