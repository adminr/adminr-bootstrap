mod = angular.module('adminr-bootstrap')


mod.directive('adminrModal',['$uibModal',($uibModal)->
  return {
    compile: (elm, attributes)->

      header = elm.find('modal-header')
      body = elm.find('modal-body')
      footer = elm.find('modal-footer')

      header = '<div class="modal-header">' + (header.html() or '<h3>' + (attributes.title or 'Modal title') + '</h3>') + '</div>'
      body = '<div class="modal-body">' + (body.html() or elm.html()) + '</div>'
      footer = '<div class="modal-footer">' + (footer.html() or '<button class="btn btn-warning" ng-click="$close()">Close</button>') + '</div>'

      template = header + body + footer
      elm.empty()


      return (scope,elm,attrs)->
        modalName = attrs.name

        modalInstance = null

        runOn = (fnName)->
          if attrs['on' + fnName]
            scope.$eval(attrs['on' + fnName])

        if modalName
          childScope = scope.$new()
          childScope.modal = scope[modalName] = {
            open:()->
              modalInstance = $uibModal.open({
                controller:'AdminrModalCtrl',
                size:attrs.size,
                scope:childScope,
                template:template
              });
              runOn('Open')
            close:()->
              modalInstance.close()
            _didClose:()->
              runOn('Close')

          }
  }
])

mod.controller('AdminrModalCtrl',['$scope',($scope)->
  $scope.$on('modal.closing',()->
    $scope.modal._didClose()
  )
])