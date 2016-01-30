(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrForm', function() {
  return {
    compile: function(elm, attributes) {
      var group, groupName, i, len, name, ref, results, wrapper;
      name = elm.attr('name') || ('form' + Math.round(Math.random() * 10000000));
      elm.attr('name', name);
      ref = elm.find('group');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        group = ref[i];
        group = angular.element(group);
        groupName = name + '.' + group.find('input').attr('name');
        wrapper = angular.element('<div class="form-group" ng-class="{\'has-error\':' + groupName + '.$invalid && !' + groupName + '.$untouched}"></div>');
        wrapper.append(group.contents());
        wrapper.append(angular.element('<p class="help-block" ng-if="' + groupName + '.$error.required && !' + groupName + '.$untouched">This field is required</p>'));
        group.replaceWith(wrapper);
        results.push(console.log(group.find('input').attr('name')));
      }
      return results;
    }
  };
});


},{}],2:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrPagination', [
  'uibPaginationConfig', function(uibPaginationConfig) {
    uibPaginationConfig.firstText = '<<';
    uibPaginationConfig.lastText = '>>';
    uibPaginationConfig.previousText = '<';
    uibPaginationConfig.nextText = '>';
    uibPaginationConfig.maxSize = 10;
    return {
      template: '<uib-pagination ng-change="dataChanged()" ng-model="data.page" total-items="data.count" items-per-page="data.limit" boundary-links="true" rotate="false"></uib-pagination>',
      scope: {
        adminrResource: '='
      },
      link: function(scope) {
        scope.data = {};
        scope.$watch('adminrResource.range', function(newRange) {
          if (newRange) {
            scope.data.count = newRange.count;
            scope.data.page = Math.floor(newRange.offset / newRange.limit) + 1;
            return scope.data.limit = newRange.limit;
          }
        }, true);
        return scope.dataChanged = function() {
          var range;
          range = scope.adminrResource.range;
          range.limit = scope.data.limit;
          return range.offset = (scope.data.page - 1) * range.limit;
        };
      }
    };
  }
]);


},{}],3:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrPanel', function() {
  return {
    compile: function(elm, attributes) {
      var body, heading, newBody, newHeading, panel;
      panel = angular.element('<div class="panel panel-default"></div>');
      body = elm.find('panel-body');
      if (body.length === 0) {
        body = angular.element('<div class="panel-body"></div>');
        body.append(elm.contents());
      } else {
        newBody = angular.element('<div class="panel-body"></div>');
        newBody.append(body.contents());
        body = newBody;
      }
      heading = elm.find('panel-heading');
      if (heading.length) {
        newHeading = angular.element('<div class="panel-heading"></div>');
        newHeading.append(heading.contents());
        heading.detach();
        heading = newHeading;
        panel.append(heading);
      }
      panel.append(body);
      return elm.replaceWith(panel);
    }
  };
});


},{}],4:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrTable', function() {
  return {
    compile: function(elm, attributes) {
      var body, bodyResource, cell, header, headerCell, i, j, len, len1, ref, ref1, results, row, sortColumn, text;
      elm.addClass('table table-bordered table-hover table-striped dataTable');
      ref = elm.find('tbody');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        body = ref[i];
        if (angular.element(body).attr('body-generate-header') === void 0) {
          continue;
        }
        body = angular.element(body);
        bodyResource = body.attr('body-resource');
        header = angular.element('<thead header-resource="' + bodyResource + '"></thead>');
        row = angular.element('<tr></tr>');
        header.append(row);
        ref1 = body.find('td');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          cell = ref1[j];
          cell = angular.element(cell);
          text = cell.attr('header') || '';
          headerCell = angular.element('<th>' + text + '</th>');
          sortColumn = cell.attr('sort-column');
          if (sortColumn) {
            headerCell.attr('sort-column', sortColumn);
          }
          row.append(headerCell);
          cell.removeAttr('header');
        }
        results.push(body.parent()[0].insertBefore(header[0], body[0]));
      }
      return results;
    }
  };
});

mod.directive('tableResource', function() {
  return {
    compile: function(elm, attributes) {
      var bodies;
      elm.addClass('table table-bordered table-hover table-striped');
      bodies = elm.find('tbody');
      if (bodies.length === 0) {
        bodies = angular.element('<tbody></tbody>');
        elm.append(bodies);
      }
      bodies.attr('body-resource', attributes.tableResource);
      if (attributes.tableResourcePath) {
        return bodies.attr('body-resource-path', attributes.tableResourcePath);
      }
    }
  };
});

mod.directive('bodyResource', function() {
  return {
    compile: function(elm, attributes) {
      var row;
      row = elm.find('tr');
      if (row.length === 0) {
        row = angular.element('<tr></tr>');
        elm.append(row);
      }
      return row.attr('ng-repeat', 'row in ' + attributes.bodyResource + (attributes.bodyResourcePath ? '.' + attributes.bodyResourcePath : ''));
    }
  };
});

mod.directive('headerResource', function() {
  return {
    compile: function(elm, attrs) {
      var cell, cells, i, len, resource, sortColumn;
      cells = elm.find('th');
      resource = attrs['headerResource'];
      for (i = 0, len = cells.length; i < len; i++) {
        cell = cells[i];
        cell = angular.element(cell);
        sortColumn = cell.attr('sort-column');
        if (sortColumn) {
          cell.addClass('{{sortClass(\'' + sortColumn + '\')}}');
          cell.attr('ng-click', 'sort(\'' + sortColumn + '\')');
        }
      }
      return function($scope) {
        $scope.sortClass = function(sortColumn) {
          var order;
          order = $scope.$eval(resource + '.params.order');
          if (order === sortColumn) {
            return 'sorting_asc';
          } else if (order === '-' + sortColumn) {
            return 'sorting_desc';
          }
          return 'sorting';
        };
        return $scope.sort = function(sortColumn) {
          var order;
          order = $scope.$eval(resource + '.params.order');
          if (order === '-' + sortColumn) {
            return $scope.$eval(resource + '.params.order = undefined');
          } else if (order === sortColumn) {
            return $scope.$eval(resource + '.params.order = \'-' + sortColumn + '\'');
          } else {
            return $scope.$eval(resource + '.params.order = \'' + sortColumn + '\'');
          }
        };
      };
    }
  };
});


},{}],5:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap', ['adminr-datasources', 'ui.bootstrap']);

require('./directives/pagination.coffee');

require('./directives/panel.coffee');

require('./directives/table.coffee');

require('./directives/form.coffee');


},{"./directives/form.coffee":1,"./directives/pagination.coffee":2,"./directives/panel.coffee":3,"./directives/table.coffee":4}]},{},[5]);
