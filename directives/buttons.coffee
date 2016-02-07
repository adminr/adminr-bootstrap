mod = angular.module('adminr-bootstrap')


mod.directive('adminrDeleteButton',['$interpolate',($interpolate)->
  return {
    scope: {
      'resource':'=adminrDeleteButton',
      'onDelete':'&'
    }
    compile: (elm, attrs)->

      elm.empty()
      icon = angular.element('<span><i class="fa fa-times"></i></span><span class="hidden"><i class="fa fa-spin fa-spinner"></i></span>')
      elm.append(icon)

      messageExpr = $interpolate(attrs.message or 'Do you really want to delete item #{{row.id}}?')

      return (scope,elm)->

        showButtonState = (index)->
          elm.find('span').addClass('hidden')
          angular.element(elm.find('span')[index]).removeClass('hidden')

        elm.bind('click',()->
          if confirm(scope.$eval(messageExpr))
            scope.$apply(()->
              showButtonState(1)
              scope.resource.$delete().then(()->
                showButtonState(0)
                scope.onDelete()
              )
            )
        )
  }
])