import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING',
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
  })

  test('zero resets all counters', () => {
    const badAction = {
      type: 'BAD',
    }

    const goodAction = {
      type: 'GOOD',
    }

    const okAction = {
      type: 'OK',
    }

    const zeroAction = {
      type: 'ZERO',
    }

    const state = initialState

    deepFreeze(state)
    const stateAfterBad = counterReducer(state, badAction)
    expect(stateAfterBad).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    })
    deepFreeze(stateAfterBad)

    const stateAfterGood = counterReducer(stateAfterBad, goodAction)
    expect(stateAfterGood).toEqual({
      good: 1,
      ok: 0,
      bad: 1,
    })
    deepFreeze(stateAfterGood)

    const stateAfterOk = counterReducer(stateAfterGood, okAction)
    expect(stateAfterOk).toEqual({
      good: 1,
      ok: 1,
      bad: 1,
    })
    deepFreeze(stateAfterOk)

    const stateAfterZero = counterReducer(stateAfterOk, zeroAction)
    expect(stateAfterZero).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
