mod = angular.module('adminr-bootstrap')


mod.directive('adminrGridCell',()->
  return {
    compile: (elm, attributes)->
      valueKey = 'row.' + attributes.adminrGridCell
      content = angular.element('<span>{{' + valueKey + '}}</span>')
      content.append(elm.contents())
      elm.append(content)
      input = angular.element('<input class="hidden form-control input-sm" type="text" ng-model="row.' + attributes.adminrGridCell + '" />')
      elm.append(input)

      return (scope,elm,attrs)->
        elm.bind('click',()->
          scope.$apply(()->
            scope.row._editing = yes
          )
        )
        scope.$watch('row._editing',(editing)->
          if editing
            elm.find('span').addClass('hidden')
            elm.find('input').removeClass('hidden')
          else
            elm.find('input').addClass('hidden')
            elm.find('span').removeClass('hidden')
        )
  }
)

mod.directive('adminrGridButton',()->
  return {
    compile: (elm, attributes)->

      elm.empty()
      icon = angular.element('<span>Edit <i class="fa fa-pencil"></i></span><span class="hidden">Save <i class="fa fa-floppy-o"></i></span><span class="hidden">Saving <i class="fa fa-spin fa-spinner"></i></span>')
      elm.append(icon)

      return (scope,elm)->
        elm.bind('click',()->
          scope.$apply(()->
            if scope.row._editing
              angular.element(elm.find('span')[0]).addClass('hidden')
              angular.element(elm.find('span')[1]).addClass('hidden')
              angular.element(elm.find('span')[2]).removeClass('hidden')
              scope.row.$save().then(()->
                delete scope.row._editing
              )
            else
              scope.row._editing = yes
          )
        )
        scope.$watch('row._editing',(editing)->
          if editing
            angular.element(elm.find('span')[0]).addClass('hidden')
            angular.element(elm.find('span')[1]).removeClass('hidden')
            angular.element(elm.find('span')[2]).addClass('hidden')
          else
            angular.element(elm.find('span')[0]).removeClass('hidden')
            angular.element(elm.find('span')[1]).addClass('hidden')
            angular.element(elm.find('span')[2]).addClass('hidden')
#          if editing
#            elm.text('Save ')
#          else
#            elm.text('Edit ')
        )
  }
)
