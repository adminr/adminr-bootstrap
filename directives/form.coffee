mod = angular.module('adminr-bootstrap')


mod.directive('adminrForm',()->
  return {
    compile: (elm, attributes)->
      name = elm.attr('name')
      if not name
        console.error('adminr-form needs name attribute to be set')
  }
)

mod.directive('formGroup',()->
  return {
    compile:(elm,attributes)->
      elm.prepend(angular.element('<label>' + attributes.label + '</label>'))
      formName = elm.parent().attr('name')
      groupName = formName + '.' + (elm.find('input').attr('name') or elm.find('textarea').attr('name'))
      elm.addClass('form-group')
      return (scope,elm)->
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