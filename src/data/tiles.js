import { clone } from 'lodash'

export const features = {
  deploy: commander => ({ type: 'deploy', commander: clone(commander) }),
}
