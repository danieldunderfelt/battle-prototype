import { action } from 'mobx'
import { deployUnit } from './unitActions'
import { groupBy, reduce, get } from 'lodash'

export const tileActions = tile => {
  const featureActions = {
    deploy: deployFeature => ({
      name: 'deploy',
      label: 'Deploy',
      action: action(() => {
        const unit = deployUnit(deployFeature.commander)
        // Check if can deploy etc
        tile.current.push(unit)
      })
    })
  }

  const featureGroups = groupBy(tile.features, 'type')
  
  return reduce(featureGroups, (actions, featureGroup, groupName) => {
    const featureAction = get(featureActions, groupName, null)
    
    if(featureAction && typeof featureAction === 'function') {
      featureGroup.forEach(feature => actions.push(featureAction(feature)))
    }
    
    return actions
  }, [])
}
