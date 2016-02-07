(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrDeleteButton', [
  '$interpolate', function($interpolate) {
    return {
      compile: function(elm, attrs) {
        var icon, messageExpr;
        elm.empty();
        icon = angular.element('<span><i class="fa fa-times"></i></span><span class="hidden"><i class="fa fa-spin fa-spinner"></i></span>');
        elm.append(icon);
        messageExpr = $interpolate(attrs.message || 'Do you really want to delete item #{{row.id}}?');
        return function(scope, elm) {
          var showButtonState;
          scope.resource = scope.$eval(attrs.adminrDeleteButton);
          scope.onDelete = function() {
            return scope.$eval(attrs.onDelete);
          };
          showButtonState = function(index) {
            elm.find('span').addClass('hidden');
            return angular.element(elm.find('span')[index]).removeClass('hidden');
          };
          return elm.bind('click', function() {
            if (confirm(scope.$eval(messageExpr))) {
              return scope.$apply(function() {
                showButtonState(1);
                return scope.resource.$delete().then(function() {
                  showButtonState(0);
                  return scope.onDelete();
                });
              });
            }
          });
        };
      }
    };
  }
]);


},{}],2:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('formGroup', function() {
  return {
    compile: function(elm, attributes) {
      var formName, groupName;
      elm.prepend(angular.element('<label>' + attributes.label + '</label>'));
      formName = elm.parent().attr('name');
      if (formName) {
        groupName = formName + '.' + (elm.find('input').attr('name') || elm.find('textarea').attr('name'));
      }
      elm.addClass('form-group');
      return function(scope, elm) {
        var hasErrorEval;
        if (groupName) {
          hasErrorEval = groupName + '.$invalid && !' + groupName + '.$untouched';
          return scope.$watch(hasErrorEval, function(hasError) {
            if (hasError) {
              return elm.addClass('has-error');
            } else {
              return elm.removeClass('has-error');
            }
          });
        }
      };
    }
  };
});

mod.directive('formSubmit', function() {
  return {
    compile: function(elm, attrs) {
      var icon;
      elm.addClass('btn btn-primary');
      elm.attr('type', 'submit');
      elm.text(elm.text() + ' ');
      icon = angular.element('<i class="hidden fa fa-spin fa-spinner"></i>');
      elm.append(icon);
      return function(scope, elm) {
        return scope.$watch(attrs.saving, function(isSaving) {
          if (isSaving) {
            return elm.find('i').removeClass('hidden');
          } else {
            return elm.find('i').addClass('hidden');
          }
        });
      };
    }
  };
});


},{}],3:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrGridCell', function() {
  return {
    compile: function(elm, attributes) {
      var content, input, valueKey;
      valueKey = 'row.' + attributes.adminrGridCell;
      content = angular.element('<span>{{' + valueKey + '}}</span>');
      content.append(elm.contents());
      elm.append(content);
      input = angular.element('<input class="hidden form-control input-sm" type="text" ng-model="row.' + attributes.adminrGridCell + '" />');
      elm.append(input);
      return function(scope, elm, attrs) {
        elm.bind('click', function() {
          return scope.$apply(function() {
            return scope.row._editing = true;
          });
        });
        elm.bind('keyup', function(e) {
          if (e.code === 'Enter') {
            return scope.$apply(function() {
              delete scope.row._editing;
              scope.row._saving = true;
              return scope.row.$save().then(function() {
                return delete scope.row._saving;
              });
            });
          }
        });
        return scope.$watch('row._editing', function(editing) {
          if (editing) {
            elm.find('span').addClass('hidden');
            return elm.find('input').removeClass('hidden');
          } else {
            elm.find('input').addClass('hidden');
            return elm.find('span').removeClass('hidden');
          }
        });
      };
    }
  };
});

mod.directive('adminrGridButton', function() {
  return {
    compile: function(elm, attributes) {
      var icon;
      elm.empty();
      icon = angular.element('<span>Edit <i class="fa fa-pencil"></i></span><span class="hidden">Save <i class="fa fa-floppy-o"></i></span><span class="hidden">Saving <i class="fa fa-spin fa-spinner"></i></span>');
      elm.append(icon);
      return function(scope, elm) {
        var showButtonState;
        showButtonState = function(index) {
          elm.find('span').addClass('hidden');
          return angular.element(elm.find('span')[index]).removeClass('hidden');
        };
        elm.bind('click', function() {
          return scope.$apply(function() {
            if (scope.row._editing) {
              delete scope.row._editing;
              scope.row._saving = true;
              return scope.row.$save().then(function() {
                return delete scope.row._saving;
              });
            } else {
              return scope.row._editing = true;
            }
          });
        });
        return scope.$watchGroup(['row._editing', 'row._saving'], function(newValue) {
          if (newValue[0]) {
            return showButtonState(1);
          } else if (newValue[1]) {
            return showButtonState(2);
          } else {
            return showButtonState(0);
          }
        });
      };
    }
  };
});


},{}],4:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrModal', [
  '$uibModal', function($uibModal) {
    return {
      compile: function(elm, attributes) {
        var body, footer, header, rootForm, template;
        rootForm = elm.find('form');
        if (rootForm.parent()[0] !== elm[0]) {
          rootForm = null;
        }
        header = elm.find('modal-header');
        body = elm.find('modal-body');
        footer = elm.find('modal-footer');
        header = '<div class="modal-header">' + (header.html() || '<h3>' + (attributes.title || 'Modal title') + '</h3>') + '</div>';
        body = '<div class="modal-body">' + (body.html() || elm.html()) + '</div>';
        footer = '<div class="modal-footer">' + (footer.html() || '<button class="btn btn-warning" ng-click="$close()">Close</button>') + '</div>';
        template = header + body + footer;
        if (rootForm) {
          rootForm.html(template);
          template = rootForm[0].outerHTML;
        }
        elm.empty();
        return function(scope, elm, attrs) {
          var childScope, modalInstance, modalName, runOn;
          modalName = attrs.name;
          modalInstance = null;
          runOn = function(fnName) {
            if (attrs['on' + fnName]) {
              return scope.$eval(attrs['on' + fnName]);
            }
          };
          if (modalName) {
            childScope = scope.$new();
            return childScope.modal = scope[modalName] = {
              open: function() {
                modalInstance = $uibModal.open({
                  controller: 'AdminrModalCtrl',
                  size: attrs.size,
                  scope: childScope,
                  template: template
                });
                return runOn('Open');
              },
              close: function() {
                return modalInstance.close();
              },
              _didClose: function() {
                return runOn('Close');
              }
            };
          }
        };
      }
    };
  }
]);

mod.controller('AdminrModalCtrl', [
  '$scope', function($scope) {
    return $scope.$on('modal.closing', function() {
      return $scope.modal._didClose();
    });
  }
]);


},{}],5:[function(require,module,exports){
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
        resource: '=paginationResource'
      },
      link: function(scope) {
        scope.data = {};
        scope.$watch('resource.range', function(newRange) {
          if (newRange) {
            scope.data.count = newRange.count;
            scope.data.page = Math.floor(newRange.offset / newRange.limit) + 1;
            return scope.data.limit = newRange.limit;
          }
        }, true);
        return scope.dataChanged = function() {
          var range;
          range = scope.resource.range;
          range.limit = scope.data.limit;
          return range.offset = (scope.data.page - 1) * range.limit;
        };
      }
    };
  }
]);


},{}],6:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrPanel', [
  '$compile', function($compile) {
    return {
      compile: function(elm, attrs) {
        var body, buttons, heading, i, j, newBody, newHeading, panel, ref, title, wrapper;
        panel = angular.element('<div class="panel panel-{{' + (attrs.context || '\'default\'') + '}}"></div>');
        body = elm.find('panel-body');
        newBody = angular.element('<div class="panel-body"></div>');
        wrapper = angular.element('<treasure-overlay-spinner active="' + (attrs.panelLoadingSpinner || 'false') + '"></treasure-overlay-spinner>');
        if (body.length === 0) {
          newBody.append(wrapper.append(elm.contents()));
        } else {
          newBody.append(wrapper.append(body.contents()));
        }
        body = newBody;
        heading = elm.find('panel-heading');
        if (heading.length) {
          buttons = heading.find('button');
          buttons.addClass('pull-right');
          buttons.detach();
          newHeading = angular.element('<div class="panel-heading"></div>');
          title = angular.element('<h3 class="panel-title pull-left"></h3>');
          title.append(heading.contents());
          newHeading.append(title);
          for (i = j = ref = buttons.length; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j) {
            newHeading.append(buttons[i]);
          }
          newHeading.append('<div class="clearfix"></div>');
          heading.detach();
          heading = newHeading;
          panel.append(heading);
        }
        panel.append(body);
        return elm.append(panel);
      }
    };
  }
]);


},{}],7:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap');

mod.directive('adminrTablePanel', [
  '$compile', '$timeout', function($compile, $timeout) {
    var template;
    template = require('../views/table-panel.html');
    return {
      compile: function(elm, attrs) {
        var body, content, table, tableContainer;
        table = elm.find('table');
        table.detach();
        content = angular.element(template);
        elm.empty();
        body = table.find('tbody');
        table.attr('adminr-table', '');
        body.attr('body-resource', 'resource');
        body.attr('body-resource-path', 'data');
        body.attr('body-generate-header', '');
        tableContainer = angular.element(content[0].querySelector('#table-panel-content'));
        tableContainer.removeAttr('id');
        tableContainer.append(table);
        return function(scope, elm, attrs) {
          scope.resource = scope.$eval(attrs.tablePanelResource);
          scope.title = scope.$eval(attrs.tablePanelTitle);
          scope.options = scope.$eval(attrs.tablePanelOptions);
          scope.addButtonFunction = function() {
            return scope.$eval(attrs.addButton);
          };
          scope.addButtonEnabled = attrs.addButton !== void 0;
          elm.append(content);
          $compile(content)(scope);
          return scope.pagingEnabled = function() {
            var ref;
            if ((ref = scope.options) != null ? ref.pagingDisabled : void 0) {
              return false;
            }
            return scope.resource.range.count > scope.resource.range.limit;
          };
        };
      }
    };
  }
]);


},{"../views/table-panel.html":10}],8:[function(require,module,exports){
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
      var columnCount, errorRow, row;
      row = elm.find('tr');
      if (row.length === 0) {
        row = angular.element('<tr></tr>');
        elm.append(row);
      }
      row.attr('ng-repeat', 'row in ' + attributes.bodyResource + (attributes.bodyResourcePath ? '.' + attributes.bodyResourcePath : ''));
      columnCount = row.find('td').length + row.find('th').length;
      errorRow = angular.element('<tr class="danger" ng-if="resource.error"><td class="text-center" colspan="' + columnCount + '">Could not load resource: <br /> {{resource.error.data}} <button class="btn" ng-click="resource.setNeedsReload()">Retry</button></td></tr>');
      return elm.append(errorRow);
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


},{}],9:[function(require,module,exports){
var mod;

mod = angular.module('adminr-bootstrap', ['adminr-datasources', 'ui.bootstrap']);

require('./directives/pagination.coffee');

require('./directives/panel.coffee');

require('./directives/table.coffee');

require('./directives/table-panel.coffee');

require('./directives/form.coffee');

require('./directives/grid.coffee');

require('./directives/modal.coffee');

require('./directives/buttons.coffee');


},{"./directives/buttons.coffee":1,"./directives/form.coffee":2,"./directives/grid.coffee":3,"./directives/modal.coffee":4,"./directives/pagination.coffee":5,"./directives/panel.coffee":6,"./directives/table-panel.coffee":7,"./directives/table.coffee":8}],10:[function(require,module,exports){
module.exports = '<div>\n    <adminr-panel panel-loading-spinner="!resource.resolved">\n        <panel-heading>\n            {{title}}\n            <button class="btn btn-default fa fa-plus" ng-if="addButtonEnabled" ng-click="addButtonFunction()"></button>\n        </panel-heading>\n        <panel-body>\n            <div class="row">\n                <div class="col-md-4 form-inline">\n                    <div class="dataTables_length" ng-if="!options.numbersDisabled">\n                        <label>\n                            Show\n                            <select ng-model="resource.range.limit" ng-options="i for i in [5,10,20,50]" class="form-control input-sm"></select>\n                            entries\n                        </label>\n                    </div>\n                </div>\n                <div class="col-md-8 form-inline" ng-if="!options.searchDisabled">\n                    <div class="text-right">\n                        <label>\n                            <div class="input-group">\n                                <input ng-model="resource.params.q" type="text" class="form-control" placeholder="Search..." />\n                                <span class="input-group-btn" ng-if="resource.params.q">\n                                    <a class="btn btn-default" ng-click="resource.params.q = null">\n                                        <i class="fa fa-times"></i>\n                                    </a>\n                                </span>\n                            </div>\n                        </label>\n                    </div>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-md-12" id="table-panel-content">\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-md-12 text-right">\n                    <adminr-pagination class="pagination-md" pagination-resource="resource" ng-if="pagingEnabled()"></adminr-pagination>\n                </div>\n            </div>\n        </panel-body>\n    </adminr-panel>\n</div>';
},{}]},{},[9]);
