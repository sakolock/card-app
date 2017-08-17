this["Story"] = this["Story"] || {};
this["Story"]["templates"] = this["Story"]["templates"] || {};
this["Story"]["templates"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<article>\n  <header>\n    <h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n    <hr />\n  </header>\n  <section id=\"mainSection\"></section>\n</article>";
},"useData":true});
this["Story"]["templates"]["story"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<article id=\"story\">\n  <h1>"
    + container.escapeExpression(((helper = (helper = helpers.mainTitle || (depth0 != null ? depth0.mainTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mainTitle","hash":{},"data":data}) : helper)))
    + "</h1>\n  <section class=\"story-container\"></section>\n</article>";
},"useData":true});
this["Story"]["templates"]["word"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"draggable-word droppable-word\">\n  <span class=\"word\">"
    + container.escapeExpression(((helper = (helper = helpers.word || (depth0 != null ? depth0.word : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"word","hash":{},"data":data}) : helper)))
    + "</span>\n  <span class=\"top-burger\">_</span>\n  <span class=\"bottom-burger\">_</span>\n</div>";
},"useData":true});