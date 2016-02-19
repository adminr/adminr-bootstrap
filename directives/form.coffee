mod = angular.module('adminr-bootstrap')


mod.directive('adminrForm',()->
  return {
    priority: -10
    compile: (elm, attrs)->
#      name = attrs.name
#      if not name
#        console.error('adminr-form needs name attribute to be set')

      if attrs.adminrForm
        elm.attr('ng-submit',attrs.adminrForm + '.$save()')

      errorElm = elm.find('form-error')
      if errorElm.length is 0
        errorElm = angular.element('<div class="alert alert-danger">Error sending form: {{formResource.error.data.error || formResource.error.data || formResource.error}}</div>')
        elm.prepend(errorElm)
      errorElm.attr('ng-if','formResource.error')

      for button in elm.find('button')
        btn = angular.element(button)
        if typeof btn.attr('form-submit') isnt 'undefined'
          btn.attr('saving','!formResource.resolved')

      return (scope,elm)->
        if attrs.adminrForm
          scope.$watch(attrs.adminrForm,(value)->
            scope.formResource = value
          )
        elm.on('submit',()->
          scope.$apply(()->
            scope.formResource.$save()
          )
        )
  }
)

mod.directive('formGroup',()->
  return {
    compile:(elm,attributes)->
      elm.prepend(angular.element('<label>' + attributes.label + '</label>'))
      formName = elm.parent().attr('name')
      if formName
        groupName = formName + '.' + (elm.find('input').attr('name') or elm.find('textarea').attr('name'))
      elm.addClass('form-group')
      return (scope,elm)->
        if groupName
          hasErrorEval = groupName + '.$invalid && !' + groupName + '.$untouched'
          scope.$watch(hasErrorEval,(hasError)->
            if hasError
              elm.addClass('has-error')
            else
              elm.removeClass('has-error')
          )
  }
)


mod.directive('formSubmit',()->
  return {
    compile:(elm,attrs)->
      elm.addClass('btn btn-primary')
      elm.attr('type','submit')
      elm.text(elm.text() + ' ')
      icon = angular.element('<i class="hidden fa fa-spin fa-spinner"></i>')
      elm.append(icon)
      return (scope,elm)->
        scope.$watch(attrs.saving,(isSaving)->
          if isSaving
            elm.find('i').removeClass('hidden')
          else
            elm.find('i').addClass('hidden')
        )

  }
)