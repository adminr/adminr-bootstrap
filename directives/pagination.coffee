mod = angular.module('adminr-bootstrap')

mod.directive('adminrPagination',['uibPaginationConfig',(uibPaginationConfig)->
  uibPaginationConfig.firstText = '<<'
  uibPaginationConfig.lastText = '>>'
  uibPaginationConfig.previousText = '<'
  uibPaginationConfig.nextText = '>'
  uibPaginationConfig.maxSize = 10

  return {
    template:'<uib-pagination ng-change="dataChanged()" ng-model="data.page" total-items="data.count" items-per-page="data.limit" boundary-links="true" rotate="false"></uib-pagination>'
    scope:{
      adminrResource:'='
    }
    link: (scope)->
        scope.data = {}
        scope.$watch('adminrResource.range',(newRange)->
          if newRange
            scope.data.count = newRange.count
            scope.data.page = Math.floor(newRange.offset / newRange.limit) + 1
            scope.data.limit = newRange.limit
  #          console.log('range',newRange)
        ,yes)

        scope.dataChanged = ()->
          range = scope.adminrResource.range
          range.limit = scope.data.limit
          range.offset = (scope.data.page - 1) * range.limit
#          console.log('data',scope.data)
  }
])
