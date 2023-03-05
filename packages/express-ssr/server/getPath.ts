import path from 'path'
import { cwd } from 'process'

export const getPath = (...args: string[]) => path.resolve(cwd(), ...args)
