mod = angular.module('adminr-bootstrap')


mod.directive('adminrPanel',['$compile',($compile)->
  return {
    compile: (elm, attrs)->
      panel = angular.element('<div class="panel panel-{{' + (attrs.context or '\'default\'') + '}}"></div>')
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

        buttons = heading.find('button')
        buttons.addClass('pull-right')
        buttons.detach()


        newHeading = angular.element('<div class="panel-heading"></div>')
        title = angular.element('<h3 class="panel-title pull-left"></h3>')
        title.append(heading.contents())
        newHeading.append(title)
        for i in [buttons.length..0]
          newHeading.append(buttons[i])
        newHeading.append('<div class="clearfix"></div>')

        heading.detach()
        heading = newHeading
        panel.append(heading)



      panel.append(body)

      elm.append(panel)

  }
])
