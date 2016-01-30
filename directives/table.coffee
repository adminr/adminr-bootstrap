mod = angular.module('adminr-bootstrap')


mod.directive('adminrTable',()->
  return {
    compile: (elm, attributes)->
      elm.addClass('table table-bordered table-hover table-striped dataTable')

      for body in elm.find('tbody')
        if angular.element(body).attr('body-generate-header') is undefined
          continue
        body = angular.element(body)
        bodyResource = body.attr('body-resource')

        header = angular.element('<thead header-resource="' + bodyResource + '"></thead>')
        row = angular.element('<tr></tr>')
        header.append(row)

        for cell in body.find('td')
          cell = angular.element(cell)
          text = cell.attr('header') or ''
          headerCell = angular.element('<th>' + text + '</th>')
          sortColumn = cell.attr('sort-column')
          headerCell.attr('sort-column',sortColumn) if sortColumn
          row.append(headerCell)
          cell.removeAttr('header')

#        console.log(body)
        body.parent()[0].insertBefore(header[0],body[0])
  }
)
mod.directive('tableResource',()->
  return {
    compile:(elm,attributes)->

      elm.addClass('table table-bordered table-hover table-striped')

      bodies = elm.find('tbody')
      if bodies.length is 0
        bodies = angular.element('<tbody></tbody>')
        elm.append(bodies)

      bodies.attr('body-resource',attributes.tableResource)
      bodies.attr('body-resource-path',attributes.tableResourcePath) if attributes.tableResourcePath
  }
)

mod.directive('bodyResource',()->
  return {
    compile:(elm,attributes)->
      row = elm.find('tr')
      if row.length is 0
        row = angular.element('<tr></tr>')
        elm.append(row)
      row.attr('ng-repeat','row in ' + attributes.bodyResource + if attributes.bodyResourcePath then '.' + attributes.bodyResourcePath else '')
  }
)

mod.directive('headerResource',()->
  return {
    compile:(elm,attrs)->
      cells = elm.find('th')
      resource = attrs['headerResource']
      for cell in cells
        cell = angular.element(cell)
        sortColumn = cell.attr('sort-column')
        if sortColumn
          cell.addClass('{{sortClass(\'' + sortColumn + '\')}}')
          cell.attr('ng-click','sort(\'' + sortColumn + '\')')
      return ($scope)->
        $scope.sortClass = (sortColumn)->
          order = $scope.$eval(resource + '.params.order')
          if order is sortColumn
            return 'sorting_asc'
          else if order is '-' + sortColumn
            return 'sorting_desc'
          return 'sorting'

        $scope.sort = (sortColumn)->
          order = $scope.$eval(resource + '.params.order')
          if order is '-' + sortColumn
            $scope.$eval(resource + '.params.order = undefined')
          else if order is sortColumn
            $scope.$eval(resource + '.params.order = \'-' + sortColumn + '\'')
          else
            $scope.$eval(resource + '.params.order = \'' + sortColumn + '\'')



  }
)
