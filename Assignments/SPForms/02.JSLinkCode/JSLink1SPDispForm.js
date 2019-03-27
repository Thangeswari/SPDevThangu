(function () {
    var PriorityContext = {};
    PriorityContext.Templates = {
	Footer: "2019 Thangu <#= ctx.ListTitle #>!"
};
  
 
    
    PriorityContext.Templates.Fields = {
        "Priority": {
            "View": PriorityViewTemplate
        }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(PriorityContext);
})();
function PriorityViewTemplate(ctx) {
    var priorityItem = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
switch (priorityItem) { 
        case "(1) High": 
            return "<span style='color : red'>" + priorityItem + "</span>"; 
            break; 
        case "(2) Normal": 
            return "<span style='color : green'>" + priorityItem + "</span>"; 
            break; 
        case "(3) Low": 
            return "<span style='color : grey'>" + priorityItem + "</span>"; 
    } 

}

