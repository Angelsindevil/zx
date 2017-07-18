
<template id="parent-template">
    <div>
        <span>父组件的数据是：</span>  ---> {{parentMsg}}
        <!-- 自定义事件名如果写成驼峰命名法，就无法获取数据也不报错，不得其解-->
        <child @get-message="get"></child>
        <template id="child-template">
            <div>
                <span>子组件的数据是：</span>  ---> {{childMsg}}
                <button @click="send">发送</button>
            </div>
        </template>
 
    </div>
</template>
<script src="//cdn.bootcss.com/vue/1.0.26/vue.js"></script>
<script>
    import Vue from 'vue'
    var Parent = Vue.component('parent',{
        template: '#parent-template',
        data(){
            return {parentMsg:'111'}
        },
        //接收子组件传过来的数据
        methods:{
            get:function(msg){
                alert(msg);
                this.parentMsg = msg;
            }
        }
    });
    //注册子组件
    var Child = Vue.component('child',{
        template:'#child-template',
        data(){
            return {childMsg:'99999'}
        },
        //把子组件数据发送给父组件
        methods:{
            send:function(){
                this.$emit('get-message', this.childMsg)
            }
        }
    });
</script>