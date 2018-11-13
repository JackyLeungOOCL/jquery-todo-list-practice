$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented
        // Add item to To Do List
        function addToDo() {
            var content = $(".input-text").val();
            $("ol").append('<li class="item-todo"><input name="done-todo" type="checkbox" class="done-todo"><span class="item-content">' + content + '</span></li>');
            $("ol").last().find("li").find("input").data("data", content);
            $(".input-text").val('');
        }
        
        $("#button").click(function() {
            addToDo();
        });

        $(".input-text").bind("enterKey",function(e){
            addToDo();
        });

        $(".input-text").keyup(function(e){
            if (e.keyCode == 13)
            {
                $(this).trigger("enterKey");
             }
        });

        // Change Item state
        $("ol").on("change", ".done-todo", function() {
            if (this.checked) {
                $(this).parent().addClass("checked");
            } else {
                $(this).parent().removeClass("checked");
            }
        });

        // Add filter
        $("a").click(function() {
            var fil = $(this).attr("data-filter");
            $("a").removeClass("selected");
            $(this).addClass("selected");

            switch(fil) {
                case "all":
                    $(".item-todo").show();
                    break;

                case "active":
                    $(".item-todo").filter(".checked").hide();
                    $(".item-todo").not(".checked").show();
                    break;

                case "complete":
                    $(".item-todo").filter(".checked").show();
                    $(".item-todo").not(".checked").hide();
            }
        });

        // Double click to edit list item
        $("div").on("dblclick", ".item-content", function() {
            $(this).attr("contenteditable", "true");
        });

        $("div").on("focusout", ".item-content", function() {
            $(this).attr("contenteditable", "false");
        });
    });