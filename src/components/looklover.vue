<template>
    <div class="hello">
        <div class="block1">
            <span>lookLover</span>
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
        name: 'lookLover',
        data() {
            return {
                items: ['path1', 'path2'],
                selctAllMode: false,
                checkGroup: [],
                searchValue: '',
                showModal: false,
                selctAllIPMode: true,
                checkIPGroup: [],
                popupMsg: '',
                cmdresult: [],
            }
        },
        mounted() {
            this.fetchData().then(result => {
                sourceData = result.map(item => {
                    let i = item.indexOf(':');
                    return i < 0 ? item : item.slice(0, i);
                });
                this.items = sourceData;
                console.log(result);
            });
            this.checkIPGroup = this.ipitems;
        },
        methods: {
            checkChange() {
                console.log(this.items);
            },
            async fetchData() {
                let data = await $http('http://pcw-api.qiyi.domain/allpath', { dataType: 'jsonp' });
                return data.data;
            },
            async purgeCache() {
                if (this.checkGroup.length === 0) {
                    this.popupMsg = '请选择要清除的路径';
                    this.showModal = true;
                    return;
                }
                if (this.checkIPGroup.length === 0) {
                    this.popupMsg = '请选择要清除的机器';
                    this.showModal = true;
                    return;
                }
                if (this.checkGroup.length > 3) {
                    this.popupMsg = '缓存清除路径不能超过三个!';
                    this.showModal = true;
                    return;
                }

                let path = this.checkGroup.join(',');
                let iplist = this.checkIPGroup.join(',');
                console.log(path);
                let result = await $http('http://pcw-api.qiyi.domain/purgepath', {
                    dataType: 'jsonp',
                    params: {
                        path,
                        iplist
                    }
                });
            }
        },
        watch: {
            selctAllMode() {
                if (this.selctAllMode) {
                    this.checkGroup = this.items;
                } else {
                    this.checkGroup = [];
                }
            },
            selctAllIPMode() {
                if (this.selctAllIPMode) {
                    this.checkIPGroup = this.ipitems;
                } else {
                    this.checkIPGroup = [];
                }
            },
            checkGroup() {
                console.log(this.checkGroup);
            },
            searchValue() {
                if (this.searchValue.length > 0) {
                    this.items = sourceData.filter(item => {
                        return item.indexOf(this.searchValue) > 0;
                    })
                } else {
                    this.items = sourceData;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    
</style>