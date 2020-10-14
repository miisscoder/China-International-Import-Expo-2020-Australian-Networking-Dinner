(function(){

    function Toast(options){

        this.defaults = {
            timeout: 2000,
            loadIcon: 'images/load.gif'
        }

        this.settings = $.extend({},this.defaults,options||{})

        this.structure()
    }

    window.Toast = Toast;

    Toast.prototype = {

        structure: function(){

            var container = this.container = document.createElement("div")
            container.className = 'toast'
            document.getElementsByTagName('body')[0].appendChild(container)

            var wrap = this.wrap = document.createElement("div")
            wrap.className = 'toast-wrap flex-middle'
            container.appendChild(wrap)

            box = this.box = document.createElement("div")
            box.className = 'toast-box flex-middle'
            wrap.appendChild(box)

        },

        show: function(txt){
            var text = '<p>'+txt+'</p>'
            this.box.innerHTML = text
            this.state = 1
            $(this.container).fadeIn()
            setTimeout(function(){
                $(this.container).fadeOut()
                this.state = 0
            },this.settings.timeout);
        },

        loading: function(){
            var img = '<img class="toast-load" src="'+this.settings.loadIcon+'" />'
            this.box.innerHTML = img
            this.state = 2
            $(this.container).fadeIn()
        },

        close: function(){
            $(this.container).fadeOut()
            this.state = 0
        }

    }

}())