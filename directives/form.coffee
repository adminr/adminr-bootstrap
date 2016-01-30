mod = angular.module('adminr-bootstrap')


mod.directive('adminrForm',()->
  return {
    compile: (elm, attributes)->
      name = elm.attr('name') or ('form' + Math.round(Math.random()*10000000))
      elm.attr('name',name)
      for group in elm.find('group')
        group = angular.element(group)
        groupName = name + '.' + group.find('input').attr('name')
        wrapper = angular.element('<div class="form-group" ng-class="{\'has-error\':' + groupName + '.$invalid && !' + groupName + '.$untouched}"></div>')
        wrapper.append(group.contents())
        wrapper.append(angular.element('<p class="help-block" ng-if="' + groupName + '.$error.required && !' + groupName + '.$untouched">This field is required</p>'))
        group.replaceWith(wrapper)
        console.log(group.find('input').attr('name'))
  }
)
