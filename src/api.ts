import instance from './request'

interface IMusicArg {
  url: string
  level: string
  type: string
}

const parseMusic = (arg: IMusicArg) => {
  return instance.post('/music', arg)
}

export { parseMusic }
