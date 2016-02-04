mod = angular.module('adminr-bootstrap')


mod.directive('adminrPanel',()->
  return {
    compile: (elm, attrs)->
      panel = angular.element('<div class="panel panel-default"></div>')
      body = elm.find('panel-body')

      newBody = angular.element('<div class="panel-body"></div>')
      wrapper = angular.element('<treasure-overlay-spinner active="' + (attrs.panelLoadingSpinner or 'false') + '"></treasure-overlay-spinner>')
      if body.length is 0
        newBody.append(wrapper.append(elm.contents()))
      else
        newBody.append(wrapper.append(body.contents()))
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
