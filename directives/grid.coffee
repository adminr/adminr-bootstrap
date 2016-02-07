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
        elm.bind('keyup',(e)->
          if e.code is 'Enter'
            scope.$apply(()->
              delete scope.row._editing
              scope.row._saving = yes
              scope.row.$save().then(()->
                delete scope.row._saving
              )
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

        showButtonState = (index)->
          elm.find('span').addClass('hidden')
          angular.element(elm.find('span')[index]).removeClass('hidden')

        elm.bind('click',()->
          scope.$apply(()->
            if scope.row._editing
              delete scope.row._editing
              scope.row._saving = yes
              scope.row.$save().then(()->
                delete scope.row._saving
              )
            else
              scope.row._editing = yes
          )
        )
        scope.$watchGroup(['row._editing','row._saving'],(newValue)->
          if newValue[0]
            showButtonState(1)
          else if newValue[1]
            showButtonState(2)
          else
            showButtonState(0)
        )
  }
)
