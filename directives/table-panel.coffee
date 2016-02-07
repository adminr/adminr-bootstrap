mod = angular.module('adminr-bootstrap')


mod.directive('adminrTablePanel',['$compile','$timeout',($compile,$timeout)->
  template = require('../views/table-panel.html')
  return {
#    scope:{
#      title:'=tablePanelTitle'
#      resource:'=tablePanelResource'
#      options:'=tablePanelOptions'
#      addButtonFunction:'&addButton'
#    },
    compile:(elm,attrs)->
      table = elm.find('table')
      table.detach()

      content = angular.element(template)
      elm.empty()
      body = table.find('tbody')
      table.attr('adminr-table','')
      body.attr('body-resource','resource')
      body.attr('body-resource-path','data')
      body.attr('body-generate-header','')

      tableContainer = angular.element(content[0].querySelector('#table-panel-content'))
      tableContainer.removeAttr('id')
      tableContainer.append(table)

      return (scope,elm,attrs)->

        scope.resource = scope.$eval(attrs.tablePanelResource)
        scope.title = scope.$eval(attrs.tablePanelTitle)
        scope.options = scope.$eval(attrs.tablePanelOptions)
        scope.addButtonFunction = ()-> scope.$eval(attrs.addButton)

        scope.addButtonEnabled = attrs.addButton isnt undefined

        elm.append(content)
        $compile(content)(scope)

        scope.pagingEnabled = ()->
          if scope.options?.pagingDisabled
            return no
          return scope.resource.range.count > scope.resource.range.limit
  }
])