<template>
    <div class="hello">
        <div class="block1">
            <span>Pcw-Api测试环境切换工具</span>
        </div>
        <div class="block2">
            <span>输入路径</span>
            <input v-model="searchValue" placeholder="enter path to be purged..." style="width: 300px;height: 30px;" />
            <Button type="button" class="btn btnsearch">search</Button>
        </div>
        <div class="block4">
            <Button type="button" class="btn btnclear" @click="changeEnvironment">切换环境</Button>
        </div>

        <modal v-if="showModal" @close="showModal = false">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div>
                            <div style="color: #CD5C5C; font-size: 18px; font-weight: 700;" v-html="popupMsg"></div>
                        </div>
                        <Button type="button" class="btn modalBtn" @click="showModal = false">OK</Button>
                    </div>
                </div>
            </div>

        </modal>
    </div>

</template>


<script>
    import { $http } from '../../lib/fetch';
    let sourceData;
    export default {
        name: 'HelloWorld',
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
            

           
        },
        watch: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .btn {
        color: #fff;
        background-color: #19be6b;
        border-color: #19be6b;
        text-align: center;
        font-weight: 700;
        vertical-align: center;
        line-height: 1.5;
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        display: inline-block;
        font-size: 14px;

    }

    .btn:hover {
        text-decoration: none;
        background-color: #47cb89;
        border-color: #47cb89;
    }

    .btnsearch {
        height: 35px;
        width: 60px;
    }

    .btnclear {
        height: 35px;
        width: 160px;
        font-weight: 700;
        font-size: 18px;
    }


    ul li {
        list-style-type: none;
    }

    ul {
        padding: 0;
        margin: 0px 20px 0px 20px;
    }

    .block1 {
        margin-bottom: 40px;
        color: #409eff;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
    }

    .block2 {
        margin-bottom: 60px;
        text-align: center;
    }

   

    .block4 {
        text-align: center;
        height: 100%;
    }

    .item {
        border: 1px solid #ddd;
        margin: 10px 0px 10px 0px;
        height: 35px;
        width: 80%;
        margin-left: 10%;
    }


   
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 60px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        text-align: center;
    }


    .modal-body {
        margin: 20px 0;
    }

    .modal-default-button {
        float: right;
    }


    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    .modalBtn {
        margin-top: 30px;
    }
</style>