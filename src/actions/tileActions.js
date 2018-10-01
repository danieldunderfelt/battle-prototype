import { action } from 'mobx'
import { deployUnit } from './unitActions'
import { groupBy, reduce, get, pick } from 'lodash'

export const tileActions = tile => {
  const featureActions = {
    deploy: feature => ({
      isAvailable: () => tile.current.length === 0,
      label: `Deploy ${feature.commander.name}'s ${feature.commander.unitType}`,
      action: action(() => {
        const unit = deployUnit(feature.commander)
        // Check if can deploy etc
        tile.current.push(unit)
      })
    })
  }
  
  if(!tile) {
    return []
  }

  return [...getFeatureActions(tile.features, featureActions)]
}

function getFeatureActions(features, featureActions) {
  const featureGroups = groupBy(features, 'type')

  return reduce(
    featureGroups,
    (actions, featureGroup, groupName) => {
      const featureAction = get(featureActions, groupName, null)

      if (featureAction && typeof featureAction === 'function') {
        featureGroup.forEach(feature => {
          const actionItem = featureAction(feature)
          
          if(actionItem.isAvailable()) {
            actions.push({ ...pick(actionItem, 'label', 'action'), name: groupName })
          }
        })
      }

      return actions
    },
    []
  )
}
