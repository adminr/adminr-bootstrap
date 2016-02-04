mod = angular.module('adminr-bootstrap')


mod.directive('adminrTablePanel',['$compile','$timeout',($compile,$timeout)->
  template = require('../views/table-panel.html')
  return {
    scope:{
      title:'=tablePanelTitle'
      resource:'=tablePanelResource'
      options:'=tablePanelOptions'
    },
    compile:(elm,attrs)->
      table = elm.find('table').clone()

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

      return {
        post:(scope,elm,attrs,ctrl,transcludeFn)->
          elm.append(content)
          $compile(content)(scope)

          scope.pagingEnabled = ()->
            if scope.options?.pagingDisabled
              return no
            return scope.resource.range.count > scope.resource.range.limit
            return scope.resource.range.count
      }
  }
])