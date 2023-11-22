import { right } from './either'

test('sucess result', () => {
  const sucess = right('sucess')
  expect(sucess.value).toEqual('sucess')
})
test('error result', () => {
  const error = right('error')
  expect(error.value).toEqual('error')
})
