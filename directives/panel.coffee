mod = angular.module('adminr-bootstrap')


mod.directive('adminrPanel',()->
  return {
    compile: (elm, attributes)->
      panel = angular.element('<div class="panel panel-default"></div>')
      body = elm.find('panel-body')
      if body.length is 0
        body = angular.element('<div class="panel-body"></div>')
        body.append(elm.contents())
      else
        newBody = angular.element('<div class="panel-body"></div>')
        newBody.append(body.contents())
        body = newBody

      heading = elm.find('panel-heading')
      if heading.length
        newHeading = angular.element('<div class="panel-heading"></div>')
        newHeading.append(heading.contents())
        heading.detach()
        heading = newHeading
        panel.append(heading)



      panel.append(body)

      elm.replaceWith(panel)
  }
)
